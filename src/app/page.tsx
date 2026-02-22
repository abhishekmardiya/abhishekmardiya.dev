import type { Metadata } from "next";
import Link from "next/link";
import { BlogLinks } from "@/component/BlogLinks";
import { SITE_CONSTANTS } from "@/constants";
import { getOgImage, getSeoMetaData } from "@/utils";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${SITE_CONSTANTS.siteName} | ${SITE_CONSTANTS.profession}`;
  const description = `Portfolio, blog, and technical articles on web development, performance, and building scalable applications.`;

  const { ogImage } = getOgImage(title);

  const { finalMetadata } = getSeoMetaData({
    title,
    description,
    wholeSlug: "/",
    ogImage,
    isFromIndexPage: true,
  });

  return finalMetadata;
}

export default function Page() {
  return (
    <section>
      <h1 className="sm:mt-6 mb-6 text-xl font-semibold tracking-tighter sm:mb-8 sm:text-2xl">
        {SITE_CONSTANTS.siteName}
      </h1>

      <p className="text-[15px] leading-relaxed sm:text-base">
        {`I'm a ${SITE_CONSTANTS.profession} focused on building scalable, high-performance web applications. I enjoy working with modern JavaScript ecosystems, crafting clean architecture, and turning complex problems into simple, efficient solutions. I'm passionate about continuous learning and building products that deliver real impact.`}
      </p>

      <div className="my-6 sm:my-8">
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
          <h2 className="text-lg font-medium sm:text-xl">Blog</h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-zinc-100 active:text-zinc-200 transition-colors py-2 inline-flex items-center min-h-11"
          >
            View all
          </Link>
        </div>
        <BlogLinks isFromIndexPage />
      </div>
    </section>
  );
}
