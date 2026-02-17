import Link from "next/link";

export const Footer = () => {
  const links = [
    { name: "Linkedin", url: "https://in/abhishek-mardiya-2a82a3147" },
    { name: "GitHub", url: "https://github.com/abhishekmardiya" },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-all duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
};
