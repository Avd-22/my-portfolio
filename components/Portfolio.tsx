'use client';
import { useRef, type ReactNode } from 'react';
import useSmoothNavigation from '../hooks/useSmoothNavigation';
import Header from './layout/Header';
import useSectionObserver from '../hooks/useSectionObserver';
export default function Portfolio({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useSmoothNavigation(containerRef);
  const activeSection = useSectionObserver(containerRef);
  return (
    <div ref={containerRef} className="site">
      <Header activeSection={activeSection} />
      {children}
    </div>
  );
}
