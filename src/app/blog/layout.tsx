import Link from "next/link";
import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className="text-sm text-zinc-400 hover:text-zinc-100 active:text-zinc-200 transition-all my-4 block py-2 min-h-[44px] flex items-center w-fit sm:my-6"
      >
        ← Go Home
      </Link>
      {children}
    </>
  );
}
