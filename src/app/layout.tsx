import { Footer } from "@/component/Footer";
import { Header } from "@/component/Header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

const inter = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased tracking-tight overflow-x-hidden">
        <Header />
        <div className="min-h-screen flex flex-col justify-between pb-6 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-24 sm:pt-20 sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))] bg-zinc-950 text-zinc-200 overflow-x-hidden">
          <main className="max-w-[80ch] mx-auto w-full space-y-6 overflow-x-hidden">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
