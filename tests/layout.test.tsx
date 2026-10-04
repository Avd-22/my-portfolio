import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout, { metadata } from '../app/layout';
const get = vi.hoisted(() => vi.fn());
vi.mock('next/headers', () => ({ cookies: async () => ({ get }) }));

it.each(['dark', 'light', undefined, '<script>'])(
  'renders a safe initial theme for cookie %s',
  async (value) => {
    get.mockReturnValue(value === undefined ? undefined : { value });
    const tree = await RootLayout({ children: <main>Portfolio</main> });
    const html = renderToStaticMarkup(tree);
    expect(html).toContain(`data-theme="${value === 'light' ? 'light' : 'dark'}"`);
    expect(html).toContain('Skip to content');
    expect(html).toContain('Portfolio');
    expect(html).not.toContain('<script>');
    expect(get).toHaveBeenCalledWith('portfolio-theme');
    expect(metadata.title).toContain('Anuvab Das');
  },
);
