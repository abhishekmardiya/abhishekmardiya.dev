import Link from "next/link";
import { formatSlugToTitle, getAllSlug } from "@/utils";

export const BlogLinks = async ({
  isFromIndexPage = false,
}: {
  isFromIndexPage?: boolean;
}) => {
  const { blogRoutes } = await getAllSlug();

  return (
    <ul className="text-zinc-300 pl-5 space-y-0.5 list-disc">
      {blogRoutes
        .splice(0, isFromIndexPage ? 5 : blogRoutes.length)
        .map((slug) => (
          <li key={slug} className="pl-1">
            <Link
              href={slug}
              className="underline text-[15px] hover:text-blue-500 active:text-blue-400 block py-2.5 sm:text-base sm:py-1"
            >
              {formatSlugToTitle(slug)}
            </Link>
          </li>
        ))}
    </ul>
  );
};
