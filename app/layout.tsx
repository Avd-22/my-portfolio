import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { isTheme, THEME_COOKIE } from '../constants/theme';

export const metadata: Metadata = {
  title: 'Anuvab Das — Software Engineer',
  description:
    'React and TypeScript software engineer building thoughtful, scalable web experiences.',
};
export default async function RootLayout({ children }: { children: ReactNode }) {
  const savedTheme = (await cookies()).get(THEME_COOKIE)?.value;
  const initialTheme = isTheme(savedTheme) ? savedTheme : null;
  return (
    <html lang="en" data-theme={initialTheme ?? 'dark'} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
