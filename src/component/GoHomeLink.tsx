import Link from "next/link";

type Props = {
  className?: string;
};

export function GoHomeLink({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`flex w-fit items-center gap-1.5 py-2 text-sm text-zinc-400 transition-all hover:text-zinc-100 active:text-zinc-200 whitespace-nowrap ${className}`.trim()}
    >
      <span>←</span>
      Go Home
    </Link>
  );
}
