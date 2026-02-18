import { Footer } from "@/component/Footer";
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
        <div className="min-h-screen flex flex-col justify-between pt-24 pb-6  bg-zinc-950 text-zinc-200">
          <main className="max-w-[80ch] mx-auto w-full space-y-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
