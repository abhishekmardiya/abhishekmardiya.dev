import { Footer } from "@/component/Footer";
import { Header } from "@/component/Header";
import { ThemeProvider } from "@/component/ThemeProvider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import { cookies, headers } from "next/headers";
import type { ReactNode } from "react";
import { THEME_COOKIE_NAME } from "@/constants/theme";
import { resolveDocumentTheme } from "@/utils/resolve-document-theme";

const inter = Geist({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const documentTheme = resolveDocumentTheme({
    storedPreference: cookieStore.get(THEME_COOKIE_NAME)?.value,
    secChPrefersColorScheme: headerStore.get("sec-ch-prefers-color-scheme"),
  });
  const htmlClassName = `${inter.className} ${documentTheme}`.trim();

  return (
    <html lang="en" className={htmlClassName} data-scroll-behavior="smooth">
      <body className="antialiased tracking-tight overflow-x-hidden">
        <ThemeProvider>
          <Header />
          <div className="min-h-screen flex flex-col justify-between pb-6 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-24 sm:pt-20 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-hidden">
            <main className="max-w-[80ch] mx-auto w-full space-y-6 overflow-x-hidden">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
