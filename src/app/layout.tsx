import { Footer } from "@/component/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import type { ReactNode } from "react";
import { SITE_URL } from "@/constants";

const stixTwoText = STIX_Two_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Abhishek Mardiya",
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
    <html lang="en" className={stixTwoText.className}>
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
