"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { ThemeCookieSync } from "@/component/ThemeCookieSync";
import { THEME_STORAGE_KEY } from "@/constants/theme";

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props): React.JSX.Element => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme={false}
      enableSystem
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      <ThemeCookieSync />
      {children}
    </NextThemesProvider>
  );
};
