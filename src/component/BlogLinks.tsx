import Link from "next/link";
import { formatSlugToTitle, getAllBlogRoutes } from "@/utils";

export const BlogLinks = async () => {
  const { blogRoutes } = await getAllBlogRoutes();

  return (
    <ul className="text-zinc-300 pl-5 space-y-1 list-disc">
      {blogRoutes.map((slug) => (
        <li key={slug} className="pl-1">
          <Link href={slug} className="underline text-base hover:text-blue-500">
            {formatSlugToTitle(slug)}
          </Link>
        </li>
      ))}
    </ul>
  );
};
