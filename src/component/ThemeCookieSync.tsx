"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { THEME_COOKIE_NAME } from "@/constants/theme";

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365;

function writeThemeCookie(theme: string): void {
  // biome-ignore lint/suspicious/noDocumentCookie: sync cookie mirror for SSR; Cookie Store API is async and not universally available.
  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; Path=/; Max-Age=${String(COOKIE_MAX_AGE_SEC)}; SameSite=Lax`;
}

export function ThemeCookieSync(): null {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === undefined) {
      return;
    }
    writeThemeCookie(theme);
  }, [theme]);

  return null;
}
