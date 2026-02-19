"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRef, useState } from "react";

export function CopyCodeBlock({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const pre = preRef.current;
    if (!pre) {
      return;
    }

    const code = pre.querySelector("code");
    const text = code?.textContent ?? pre.textContent ?? "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded p-2 text-zinc-400 bg-zinc-800/80 hover:bg-zinc-700 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 cursor-pointer"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <title>Copied</title>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <title>Copy</title>
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>
      <pre
        ref={preRef}
        className={`pr-12 ${className ?? ""}`.trim()}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
