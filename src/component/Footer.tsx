import Link from "next/link";

export const Footer = () => {
  const links = [
    { name: "Linkedin", url: "https://in/abhishek-mardiya-2a82a3147" },
    { name: "GitHub", url: "https://github.com/abhishekmardiya" },
  ];

  return (
    <footer className="mt-18 px-4 text-center sm:mt-22">
      <div className="flex flex-wrap justify-center gap-4 gap-y-3 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
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
