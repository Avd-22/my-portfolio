import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import useSmoothNavigation from '../hooks/useSmoothNavigation';

function Harness() {
  const ref = useRef<HTMLDivElement>(null);
  useSmoothNavigation(ref);
  return (
    <div ref={ref}>
      <a href="#destination">Go</a>
      <a href="#">Top</a>
      <a href="#missing">Missing</a>
      <span>Text</span>
      <main id="main-content" tabIndex={-1} />
      <section id="destination" tabIndex={-1} />
    </div>
  );
}
afterEach(() => {
  vi.restoreAllMocks();
  history.replaceState(null, '', '/');
  document.documentElement.style.removeProperty('scroll-padding-top');
});
it.each([
  { button: 1 },
  { metaKey: true },
  { ctrlKey: true },
  { shiftKey: true },
  { altKey: true },
])('leaves modified clicks to the browser: %j', (options) => {
  const raf = vi.spyOn(window, 'requestAnimationFrame');
  const { getByText } = render(<Harness />);
  fireEvent.click(getByText('Go'), options);
  expect(raf).not.toHaveBeenCalled();
});
it('ignores prevented events, text nodes, non-links, and missing destinations', () => {
  const raf = vi.spyOn(window, 'requestAnimationFrame');
  const { getByText } = render(<Harness />);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true });
  event.preventDefault();
  getByText('Go').dispatchEvent(event);
  fireEvent.click(getByText('Text'));
  getByText('Text').firstChild!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  fireEvent.click(getByText('Missing'));
  expect(raf).not.toHaveBeenCalled();
});
it.each(['wheel', 'touchstart', 'unmount'])(
  'cancels animation and delayed focus on %s',
  (interruption) => {
    const frames: FrameRequestCallback[] = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback);
      return frames.length;
    });
    const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { getByText, unmount } = render(<Harness />);
    fireEvent.click(getByText('Go'));
    if (interruption === 'unmount') unmount();
    else fireEvent(window, new Event(interruption));
    frames[0](0);
    expect(scroll).not.toHaveBeenCalled();
    expect(document.documentElement.dataset.navigating).toBeUndefined();
  },
);
it('replaces an in-progress animation, preserves repeated hashes, and supports back to top', () => {
  history.replaceState(null, '', '#destination');
  document.documentElement.style.scrollPaddingTop = '80px';
  const frames: FrameRequestCallback[] = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const push = vi.spyOn(history, 'pushState');
  const { getByText } = render(<Harness />);
  fireEvent.click(getByText('Go'));
  expect(push).not.toHaveBeenCalled();
  fireEvent.click(getByText('Top'));
  expect(push).toHaveBeenCalledWith(null, '', '#');
  frames[0](0);
  frames[1](0);
  frames[2](900);
  expect(document.getElementById('main-content')).toHaveFocus();
});
