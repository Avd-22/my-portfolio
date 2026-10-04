'use client';
import { useCallback, useEffect, useState } from 'react';

export default function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 851px)');
    const handleBreakpoint = () => {
      if (desktop.matches) closeMenu();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
        document
          .querySelector<HTMLButtonElement>('[aria-controls="main-navigation"]')
          ?.focus();
      }
    };
    desktop.addEventListener('change', handleBreakpoint);
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => {
      desktop.removeEventListener('change', handleBreakpoint);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, closeMenu]);

  return { isOpen, closeMenu, toggleMenu };
}
