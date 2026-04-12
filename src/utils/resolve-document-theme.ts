export type DocumentTheme = "light" | "dark";

type StoredPreference = "light" | "dark" | "system";

export function normalizeThemePreference(
  raw: string | undefined
): StoredPreference | undefined {
  if (raw === "light" || raw === "dark" || raw === "system") {
    return raw;
  }
  return;
}

export function resolveDocumentTheme(params: {
  storedPreference: string | undefined;
  secChPrefersColorScheme: string | null;
}): DocumentTheme {
  const stored = normalizeThemePreference(params.storedPreference);
  if (stored === "dark") {
    return "dark";
  }
  if (stored === "light") {
    return "light";
  }
  if (params.secChPrefersColorScheme === "dark") {
    return "dark";
  }
  return "light";
}
