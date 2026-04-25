import type { Metadata } from "next";
import Link from "next/link";
import { BlogLinks } from "@/component/BlogLinks";
import { ProjectsSection } from "@/component/ProjectsSection";
import { SITE_CONSTANTS } from "@/constants";
import { getOgImage, getSeoMetaData } from "@/utils";

const bioInlineLinkClassName: string =
  "underline decoration-zinc-400 underline-offset-2 transition-colors hover:text-blue-600 dark:decoration-zinc-600 dark:hover:text-blue-400";

export function generateMetadata(): Metadata {
  const title = `${SITE_CONSTANTS.siteName} | ${SITE_CONSTANTS.profession}`;
  const description = `${SITE_CONSTANTS.profession} passionate about crafting high-performance web applications, exploring modern frontend architectures, and sharing technical insights.`;

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
      <h1 className="sm:mt-6 mb-6 text-xl font-semibold tracking-tighter text-zinc-900 sm:mb-8 sm:text-2xl dark:text-zinc-100">
        {SITE_CONSTANTS.siteName}
      </h1>

      <p className="text-[15px] leading-relaxed sm:text-base">
        {"I'm a "}
        {SITE_CONSTANTS.profession}
        {" specializing in "}
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={bioInlineLinkClassName}
        >
          React
        </a>
        {" and "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className={bioInlineLinkClassName}
        >
          Next.js
        </a>
        {
          ", focused on building scalable, high-performance web applications. I enjoy optimizing performance, designing clean frontend architecture, and turning complex problems into simple, efficient solutions. I leverage AI-assisted development workflows to enhance productivity and code quality. I'm passionate about building impactful products and continuously improving as an engineer. I would love to keep contributing to open source, and I've already "
        }
        <a
          href={SITE_CONSTANTS.nextJsContributionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={bioInlineLinkClassName}
        >
          contributed to Next.js
        </a>
        {"."}
      </p>

      <div className="my-6 sm:my-8">
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4 sm:gap-4">
          <h2 className="text-lg font-medium text-zinc-900 sm:text-xl dark:text-zinc-100">
            Blog
          </h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-600 hover:text-zinc-900 active:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:text-zinc-200 transition-colors py-2 inline-flex items-center min-h-11"
          >
            View all
          </Link>
        </div>
        <BlogLinks isFromIndexPage />
      </div>

      <ProjectsSection />
    </section>
  );
}
