import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import { isTheme } from '../constants/theme';

describe('theme', () => {
  it('rejects untrusted cookie values', () => {
    expect(isTheme('<script>')).toBe(false);
    expect(isTheme('light')).toBe(true);
  });
  it('shares context state and persists an explicit preference', async () => {
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.cookie).toContain('portfolio-theme=light');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  });
  it('uses the system preference when no preference is saved', () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList);
    render(
      <ThemeProvider initialTheme={null}>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });
  it('animates an explicitly requested theme switch even with reduced system motion', async () => {
    const transition = vi.fn((update: () => void) => {
      update();
      return { finished: Promise.resolve() };
    });
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: transition,
    });
    vi.mocked(window.matchMedia).mockImplementation(
      (query) =>
        ({
          matches: query.includes('reduced-motion'),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(transition).toHaveBeenCalledOnce();
    expect(document.documentElement.dataset.theme).toBe('light');
    Object.defineProperty(document, 'startViewTransition', { value: undefined });
  });
  it('animates with the native view transition when available', async () => {
    vi.mocked(window.matchMedia).mockImplementation(
      () =>
        ({
          matches: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
    const transition = vi.fn((update: () => void) => {
      update();
      return { finished: Promise.resolve() };
    });
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: transition,
    });
    render(
      <ThemeProvider initialTheme="dark">
        <ThemeToggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    await waitFor(() => expect(transition).toHaveBeenCalledOnce());
    Object.defineProperty(document, 'startViewTransition', { value: undefined });
  });
  it('reveals the new theme with an inert snapshot when native transitions are unavailable', async () => {
    vi.mocked(window.matchMedia).mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    });
    let finish: (() => void) | undefined;
    const finished = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const animate = vi.fn(() => ({ finished }));
    Object.defineProperty(HTMLElement.prototype, 'animate', {
      configurable: true,
      value: animate,
    });
    try {
      render(
        <ThemeProvider initialTheme="dark">
          <div className="site">
            <ThemeToggle />
          </div>
        </ThemeProvider>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
      const snapshot = document.querySelector('.theme-snapshot');
      expect(snapshot).toHaveAttribute('aria-hidden', 'true');
      expect((snapshot as HTMLElement).inert).toBe(true);
      expect(document.documentElement.dataset.theme).toBe('light');
      expect(animate).toHaveBeenCalledOnce();
      finish?.();
      await waitFor(() => expect(document.querySelector('.theme-snapshot')).toBeNull());
    } finally {
      delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
    }
  });
});
