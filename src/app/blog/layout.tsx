import Link from "next/link";
import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className="text-sm text-zinc-400 hover:text-zinc-100 transition-all my-6 block"
      >
        ← Go Home
      </Link>
      {children}
    </>
  );
}
