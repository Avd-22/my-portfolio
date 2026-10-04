'use client';
import { THEMES } from '../../constants/theme';
import useTheme from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <button
      type="button"
      className="theme"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{isDark ? '☼' : '☾'}</span>
      <span className="theme-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
