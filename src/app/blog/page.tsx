import type { Metadata } from "next";
import { BlogLinks } from "@/component/BlogLinks";
import { GoHomeLink } from "@/component/GoHomeLink";
import { getOgImage, getSeoMetaData } from "@/utils";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog";
  const description =
    "Thoughts on web development, performance optimization, and frontend best practices.";

  const { ogImage } = getOgImage(`Blog | ${description}`);

  const { finalMetadata } = getSeoMetaData({
    title,
    description,
    wholeSlug: "/blog",
    ogImage,
    isFromBlogPage: true,
  });

  return finalMetadata;
}

export default function BlogPage() {
  return (
    <section>
      <GoHomeLink className="sm:mt-4 mb-6 sm:mb-8" />
      <h1 className="mb-6 text-2xl font-semibold tracking-tighter sm:mb-8 sm:text-3xl">
        Blog
      </h1>

      <div className="my-6 sm:my-8">
        <BlogLinks />
      </div>
    </section>
  );
}
