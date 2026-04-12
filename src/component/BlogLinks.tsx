import Link from "next/link";
import { getAllBlogFullSlugs } from "@/utils";

export const BlogLinks = async ({
  isFromIndexPage = false,
}: {
  isFromIndexPage?: boolean;
}) => {
  const { blogSlugs } = await getAllBlogFullSlugs();

  return (
    <ul className="text-zinc-700 dark:text-zinc-300 pl-5 space-y-1 list-disc">
      {blogSlugs
        .splice(0, isFromIndexPage ? 5 : blogSlugs.length)
        .map((route) => (
          <li key={route.slug} className="pl-1">
            <Link
              href={route.slug}
              className="underline underline-offset-3 decoration-zinc-400 text-[15px] hover:text-blue-600 active:text-blue-500 dark:decoration-zinc-600 dark:hover:text-blue-400 dark:active:text-blue-300 block sm:text-base"
            >
              {route.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};
