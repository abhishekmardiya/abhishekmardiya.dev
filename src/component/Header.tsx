"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchCommand } from "@/component/SearchCommand";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 px-4 md:px-0 max-w-[80ch] items-center justify-between gap-6 sm:h-16">
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md py-2 text-sm sm:text-base font-medium transition-colors ${
                  isActive
                    ? "text-blue-400"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <SearchCommand />
      </div>
    </header>
  );
}
