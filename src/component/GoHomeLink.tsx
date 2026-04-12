import Link from "next/link";

type Props = {
  className?: string;
};

export function GoHomeLink({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`flex w-fit items-center gap-1.5 py-2 text-sm text-zinc-600 transition-all hover:text-zinc-900 active:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:text-zinc-200 whitespace-nowrap ${className}`.trim()}
    >
      <span>←</span>
      Go Home
    </Link>
  );
}
