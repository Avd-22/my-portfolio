'use client';
import { useEffect, useState, type RefObject } from 'react';

export default function useSectionObserver(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reveals = container.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) return;
    // Content stays visible if JavaScript is disabled or the observer is unavailable.
    container.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    const sections = Array.from(container.querySelectorAll<HTMLElement>('section[id]'));
    let frame = 0;
    const updateActive = () => {
      const line = Math.min(window.innerHeight * 0.35, 260);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= line)
        .at(-1);
      setActiveSection(current?.id ?? '');
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateActive();
    reveals.forEach((element) => revealObserver.observe(element));
    return () => {
      revealObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      container.classList.remove('motion-ready');
    };
  }, [containerRef]);

  return activeSection;
}
