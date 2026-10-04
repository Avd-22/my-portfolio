import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';

beforeEach(() => {
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
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  Object.defineProperty(document, 'startViewTransition', {
    configurable: true,
    value: undefined,
  });
  delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  document.querySelector('.theme-snapshot')?.remove();
});
it('follows system changes until the user explicitly selects a theme', () => {
  let change = () => {};
  const system = {
    matches: false,
    addEventListener: vi.fn((_event, callback) => {
      change = callback;
    }),
    removeEventListener: vi.fn(),
  };
  vi.mocked(window.matchMedia).mockReturnValue(system as unknown as MediaQueryList);
  render(
    <ThemeProvider initialTheme={null}>
      <ThemeToggle />
    </ThemeProvider>,
  );
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
  system.matches = true;
  act(() => change());
  expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  fireEvent.click(screen.getByRole('button'));
  act(() => change());
  expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible();
});
it('uses an immediate switch when an existing site cannot animate', () => {
  render(
    <ThemeProvider initialTheme="light">
      <div className="site">
        <ThemeToggle />
      </div>
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole('button'));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(document.querySelector('.theme-snapshot')).toBeNull();
});
it('sets Secure cookie attributes on HTTPS', () => {
  const cookie = vi.spyOn(document, 'cookie', 'set');
  vi.stubGlobal('location', { protocol: 'https:' });
  render(
    <ThemeProvider initialTheme="dark">
      <ThemeToggle />
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole('button'));
  expect(cookie).toHaveBeenCalledWith(expect.stringContaining('; Secure'));
});
it.each(['throw', 'reject'])(
  'recovers from a native transition that will %s',
  async (mode) => {
    const transition = vi.fn((update: () => void) => {
      if (mode === 'throw') throw new Error('unsupported');
      update();
      return { finished: Promise.reject(new Error('cancelled')) };
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
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(document.documentElement.dataset.themeTransition).toBeUndefined(),
    );
    expect(document.documentElement.dataset.theme).toBe('light');
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.dataset.theme).toBe('dark');
  },
);
it('ignores repeated toggle events while a native transition is running', async () => {
  let complete = () => {};
  const finished = new Promise<void>((resolve) => {
    complete = resolve;
  });
  const transition = vi.fn((update: () => void) => {
    update();
    return { finished };
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
  fireEvent.click(screen.getByRole('button'));
  fireEvent.click(screen.getByRole('button'));
  expect(transition).toHaveBeenCalledOnce();
  await act(async () => complete());
  expect(document.documentElement.dataset.themeTransition).toBeUndefined();
});
it('copies theme tokens and header geometry into an inert fallback and cleans up after cancellation', async () => {
  document.documentElement.style.setProperty('--accent', '#a8d9c5');
  let reject = (_reason: Error) => {};
  const finished = new Promise<void>((_resolve, rejectPromise) => {
    reject = rejectPromise;
  });
  const animate = vi.fn(() => ({ finished }));
  Object.defineProperty(HTMLElement.prototype, 'animate', {
    configurable: true,
    value: animate,
  });
  render(
    <ThemeProvider initialTheme="dark">
      <div className="site" id="site">
        <header className="site-header" id="header">
          <ThemeToggle />
        </header>
      </div>
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole('button'));
  const snapshot = document.querySelector<HTMLElement>('.theme-snapshot')!;
  expect(snapshot.style.getPropertyValue('--accent')).toBe('#a8d9c5');
  expect(snapshot.querySelector('[id]')).toBeNull();
  expect((snapshot.querySelector('header') as HTMLElement).style.position).toBe('fixed');
  fireEvent.click(screen.getByRole('button'));
  expect(animate).toHaveBeenCalledOnce();
  await act(async () => reject(new Error('cancelled')));
  expect(document.querySelector('.theme-snapshot')).toBeNull();
  document.documentElement.style.removeProperty('--accent');
});
