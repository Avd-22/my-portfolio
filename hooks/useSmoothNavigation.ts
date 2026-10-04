'use client';
import { useEffect, type RefObject } from 'react';

export default function useSmoothNavigation(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanupScroll: (() => void) | undefined;
    const handleNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null;
      if (!anchor) return;
      const id = anchor.hash.slice(1);
      const target = id
        ? document.getElementById(id)
        : document.getElementById('main-content');
      if (!target) return;
      event.preventDefault();
      cleanupScroll?.();
      const startY = window.scrollY;
      const offset =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 110;
      const endY = Math.max(
        0,
        Math.min(
          startY + target.getBoundingClientRect().top - offset,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const duration = 900;
      let frame = 0;
      let started: number | undefined;
      let cancelled = false;
      const finish = () => {
        target.focus({ preventScroll: true });
        cleanupScroll?.();
      };
      const cancel = () => cleanupScroll?.();
      cleanupScroll = () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchstart', cancel);
        delete document.documentElement.dataset.navigating;
      };
      const tick = (time: number) => {
        if (cancelled) return;
        started ??= time;
        const progress = Math.min((time - started) / duration, 1);
        const eased =
          progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: startY + (endY - startY) * eased, behavior: 'instant' });
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else finish();
      };
      document.documentElement.dataset.navigating = 'true';
      window.addEventListener('wheel', cancel, { once: true, passive: true });
      window.addEventListener('touchstart', cancel, { once: true, passive: true });
      if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash || '#');
      frame = window.requestAnimationFrame(tick);
    };
    container.addEventListener('click', handleNavigation);
    return () => {
      container.removeEventListener('click', handleNavigation);
      cleanupScroll?.();
    };
  }, [containerRef]);
}
