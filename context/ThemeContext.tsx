'use client';
import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { flushSync } from 'react-dom';
import {
  REDUCED_MOTION_QUERY,
  SYSTEM_THEME_QUERY,
  THEME_COOKIE,
  type Theme,
} from '../constants/theme';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (event: MouseEvent<HTMLButtonElement>) => void;
};
export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme | null;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme ?? 'dark');
  const preference = useRef<Theme | null>(initialTheme);
  const transitioning = useRef(false);

  const applyTheme = useCallback((value: Theme) => {
    document.documentElement.dataset.theme = value;
    setTheme(value);
  }, []);

  useEffect(() => {
    const system = window.matchMedia(SYSTEM_THEME_QUERY);
    const synchronizeSystem = () => {
      if (!preference.current) applyTheme(system.matches ? 'dark' : 'light');
    };
    synchronizeSystem();
    system.addEventListener('change', synchronizeSystem);
    return () => system.removeEventListener('change', synchronizeSystem);
  }, [applyTheme]);

  const toggleTheme = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (transitioning.current) return;
      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      root.style.setProperty('--theme-x', `${x}px`);
      root.style.setProperty('--theme-y', `${y}px`);
      root.style.setProperty(
        '--theme-radius',
        `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`,
      );
      preference.current = nextTheme;
      document.cookie = `${THEME_COOKIE}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      const update = () => flushSync(() => applyTheme(nextTheme));
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        update();
        return;
      }
      if (!document.startViewTransition) {
        const site = document.querySelector<HTMLElement>('.site');
        if (!site || typeof site.animate !== 'function') {
          update();
          return;
        }
        // Keep an inert copy of the old appearance above the new theme, then
        // reveal the live page through a growing circular hole.
        const overlay = document.createElement('div');
        overlay.className = 'theme-snapshot';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.inert = true;
        const tokens = getComputedStyle(root);
        for (const name of Array.from(tokens)) {
          if (name.startsWith('--'))
            overlay.style.setProperty(name, tokens.getPropertyValue(name));
        }
        overlay.style.colorScheme = theme;
        const snapshot = site.cloneNode(true) as HTMLElement;
        snapshot.removeAttribute('id');
        snapshot
          .querySelectorAll('[id]')
          .forEach((element) => element.removeAttribute('id'));
        snapshot.style.position = 'absolute';
        snapshot.style.top = `${-window.scrollY}px`;
        snapshot.style.width = '100%';
        const header = snapshot.querySelector<HTMLElement>('.site-header');
        const liveHeader = site.querySelector<HTMLElement>('.site-header');
        if (header && liveHeader) {
          const rect = liveHeader.getBoundingClientRect();
          Object.assign(header.style, {
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            margin: '0',
            animation: 'none',
          });
        }
        overlay.append(snapshot);
        document.body.append(overlay);
        transitioning.current = true;
        update();
        const animation = overlay.animate(
          [
            { '--reveal-radius': '0px' },
            { '--reveal-radius': root.style.getPropertyValue('--theme-radius') },
          ],
          { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' },
        );
        void animation.finished
          .catch(() => {})
          .finally(() => {
            overlay.remove();
            transitioning.current = false;
          });
        return;
      }
      transitioning.current = true;
      root.dataset.themeTransition = 'active';
      try {
        const transition = document.startViewTransition(update);
        void transition.finished
          .catch(() => {})
          .finally(() => {
            transitioning.current = false;
            delete root.dataset.themeTransition;
          });
      } catch {
        transitioning.current = false;
        delete root.dataset.themeTransition;
        update();
      }
    },
    [theme, applyTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
