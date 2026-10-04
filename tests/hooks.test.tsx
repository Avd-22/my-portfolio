import { useRef } from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import useSectionObserver from '../hooks/useSectionObserver';
import useSmoothNavigation from '../hooks/useSmoothNavigation';
import useMobileMenu from '../hooks/useMobileMenu';
import useTheme from '../hooks/useTheme';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('safely handles unattached navigation and observer refs', () => {
  const ref = { current: null };
  const { result } = renderHook(() => {
    useSmoothNavigation(ref);
    return useSectionObserver(ref);
  });
  expect(result.current).toBe('');
});
it('requires a theme provider', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => renderHook(useTheme)).toThrow(
    'useTheme must be used inside ThemeProvider',
  );
});
it('responds to desktop breakpoints and ignores unrelated keys', () => {
  let change: () => void = () => {};
  const media = {
    matches: false,
    addEventListener: vi.fn((_event, callback) => {
      change = callback;
    }),
    removeEventListener: vi.fn(),
  };
  vi.mocked(window.matchMedia).mockReturnValue(media as unknown as MediaQueryList);
  const { result, unmount } = renderHook(useMobileMenu);
  act(() => result.current.toggleMenu());
  fireEvent.keyDown(window, { key: 'Enter' });
  expect(result.current.isOpen).toBe(true);
  act(() => change());
  expect(result.current.isOpen).toBe(true);
  media.matches = true;
  act(() => change());
  expect(result.current.isOpen).toBe(false);
  unmount();
  expect(media.removeEventListener).toHaveBeenCalled();
});
function ObserverHarness() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useSectionObserver(ref);
  return (
    <div ref={ref}>
      <output>{active || 'none'}</output>
      <section id="first" className="reveal" />
      <section id="second" className="reveal" />
    </div>
  );
}
it('reveals intersecting content, tracks sections through scroll/resize, and cleans up', () => {
  let observeCallback: IntersectionObserverCallback = () => {};
  const observe = vi.fn(),
    unobserve = vi.fn(),
    disconnect = vi.fn();
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        observeCallback = callback;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    },
  );
  let top = 500;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: Element,
  ) {
    return { top: this.id === 'first' ? top : top + 300 } as DOMRect;
  });
  let frame: FrameRequestCallback = () => {};
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frame = callback;
    return 1;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  const { container, unmount } = render(<ObserverHarness />);
  expect(screen.getByText('none')).toBeInTheDocument();
  expect(observe).toHaveBeenCalledTimes(2);
  const first = container.querySelector('#first')!;
  act(() =>
    observeCallback(
      [{ target: first, isIntersecting: false }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    ),
  );
  expect(first).not.toHaveClass('visible');
  act(() =>
    observeCallback(
      [{ target: first, isIntersecting: true }] as IntersectionObserverEntry[],
      {} as IntersectionObserver,
    ),
  );
  expect(first).toHaveClass('visible');
  expect(unobserve).toHaveBeenCalledWith(first);
  top = 100;
  fireEvent.scroll(window);
  act(() => frame(0));
  expect(screen.getByText('first')).toBeInTheDocument();
  top = -300;
  fireEvent.resize(window);
  act(() => frame(1));
  expect(screen.getByText('second')).toBeInTheDocument();
  const site = container.firstElementChild!;
  unmount();
  expect(disconnect).toHaveBeenCalledOnce();
  expect(site).not.toHaveClass('motion-ready');
});
