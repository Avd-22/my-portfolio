import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import axe from 'axe-core';
import Home from '../app/page';
import { ThemeProvider } from '../context/ThemeContext';

it('has accessible landmarks, headings, links, and buttons', async () => {
  const { container } = render(
    <ThemeProvider initialTheme="dark">
      <Home />
    </ThemeProvider>,
  );
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
    // jsdom cannot calculate visual contrast; verify theme colors in the browser.
    rules: { 'color-contrast': { enabled: false } },
  });
  expect(
    results.violations.map(({ id, nodes }) => ({
      id,
      elements: nodes.map((node) => node.html),
    })),
  ).toEqual([]);
});
