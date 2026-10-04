export const THEMES = { DARK: 'dark', LIGHT: 'light' } as const;
export type Theme = (typeof THEMES)[keyof typeof THEMES];
export const THEME_COOKIE = 'portfolio-theme';
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
export function isTheme(value: unknown): value is Theme {
  return value === THEMES.DARK || value === THEMES.LIGHT;
}
