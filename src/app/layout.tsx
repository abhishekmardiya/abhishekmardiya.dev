import { Footer } from "@/component/Footer";
import { SearchCommand } from "@/component/SearchCommand";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { SITE_URL } from "@/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Abhishek Mardiya | Software Developer Engineer",
    template: "%s | Abhishek Mardiya",
  },
  description: "My portfolio, blog, and personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased tracking-tight">
        <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
          <SearchCommand />
        </div>
        <div className="min-h-screen flex flex-col justify-between pb-6 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(5rem,env(safe-area-inset-right))] pt-14 sm:pt-16 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(6rem,env(safe-area-inset-right))] bg-zinc-950 text-zinc-200">
          <main className="max-w-[80ch] mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
