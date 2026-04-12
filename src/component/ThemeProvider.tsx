"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

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
    >
      {children}
    </NextThemesProvider>
  );
};
