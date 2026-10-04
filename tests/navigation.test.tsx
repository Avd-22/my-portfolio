import { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import useSmoothNavigation from '../hooks/useSmoothNavigation';
import Header from '../components/layout/Header';
import { ThemeProvider } from '../context/ThemeContext';
function NavigationHarness() {
  const ref = useRef<HTMLDivElement>(null);
  useSmoothNavigation(ref);
  return (
    <div ref={ref}>
      <a href="#projects">Projects</a>
      <section id="projects" tabIndex={-1}>
        Selected work
      </section>
    </div>
  );
}
describe('navigation', () => {
  it('animates intermediate scroll positions and focuses the destination on completion', async () => {
    const frames: FrameRequestCallback[] = [];
    const raf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        frames.push(callback);
        return frames.length;
      });
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const rect = vi
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockReturnValue({ top: 1000 } as DOMRect);
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000,
    });
    try {
      render(<NavigationHarness />);
      await userEvent.click(screen.getByRole('link', { name: 'Projects' }));
      frames.shift()?.(0);
      frames.shift()?.(450);
      expect(scroll).toHaveBeenLastCalledWith({ top: 445, behavior: 'instant' });
      frames.shift()?.(900);
      expect(scroll).toHaveBeenLastCalledWith({ top: 890, behavior: 'instant' });
      expect(document.getElementById('projects')).toHaveFocus();
      expect(document.documentElement.dataset.navigating).toBeUndefined();
    } finally {
      raf.mockRestore();
      scroll.mockRestore();
      rect.mockRestore();
    }
  });
  it('closes the mobile menu with Escape and restores toggle focus', async () => {
    render(
      <ThemeProvider initialTheme="dark">
        <Header activeSection="projects" />
      </ThemeProvider>,
    );
    const button = screen.getByRole('button', { name: 'Toggle navigation' });
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'location',
    );
  });
});
