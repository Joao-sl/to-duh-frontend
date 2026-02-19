'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

type ThemeProvider = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProvider) {
  return (
    <NextThemeProvider defaultTheme='light' attribute='class'>
      {children}
    </NextThemeProvider>
  );
}
