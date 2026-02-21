import Link from "next/link";
import { SITE_CONSTANTS } from "@/constants";

export const Footer = () => {
  const links = [
    { name: "Linkedin", url: SITE_CONSTANTS.linkedinUrl },
    { name: "GitHub", url: SITE_CONSTANTS.githubUrl },
  ];

  return (
    <footer className="mt-18 px-4 text-center sm:mt-22">
      <div className="flex flex-wrap justify-center gap-4 gap-y-3 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
            // @ts-expect-error
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-blue-500 active:text-blue-400 transition-all duration-200 inline-flex items-center min-h-11 py-2 px-3"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};
