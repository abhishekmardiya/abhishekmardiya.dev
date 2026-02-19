import Link from "next/link";
import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link
        href="/"
        className="text-sm gap-1.5 items-center text-zinc-400 hover:text-zinc-100 active:text-zinc-200 transition-all py-2 flex w-fit"
      >
        <span> ← </span>
        Go Home
      </Link>
      {children}
    </>
  );
}
