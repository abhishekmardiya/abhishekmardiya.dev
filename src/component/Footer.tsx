import Link from "next/link";
import type { ReactElement } from "react";
import { SITE_CONSTANTS } from "@/constants";

export const Footer = (): ReactElement => {
  const links: readonly { name: string; url: string }[] = [
    { name: "LinkedIn", url: SITE_CONSTANTS.linkedinUrl },
    { name: "GitHub", url: SITE_CONSTANTS.githubUrl },
  ];

  return (
    <footer className="px-4 text-center mt-12">
      <div className="flex flex-wrap justify-center gap-4 gap-y-3 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-blue-600 active:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 dark:active:text-blue-300 transition-all duration-200 inline-flex items-center min-h-11 py-2 px-3"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};
