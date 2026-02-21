import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SITE_CONSTANTS } from "@/constants";

export const getAllSlug = async (): Promise<{
  blogRoutes: string[];
  allRoutes: string[];
}> => {
  const contentDir = path.join(process.cwd(), "src", "posts");
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  const slugs = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const pagePath = path.join(contentDir, entry.name, "page.mdx");
        try {
          await fs.access(pagePath);
          return `/blog/${entry.name}`;
        } catch {
          return null;
        }
      }),
  );

  const blogRoutes = slugs.filter((slug): slug is string => slug !== null);

  return {
    blogRoutes,
    allRoutes: ["", ...blogRoutes],
  };
};

export const formatSlugToTitle = (slug: string): string => {
  const segment = slug.split("/").pop() ?? slug;
  return (
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      // "How To .." -> "How to .."
      .replace(" To ", " to ")
  );
};

export const readBlogMDXFile = async ({
  slug,
}: {
  slug: string;
}): Promise<string> => {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "posts",
    slug,
    "page.mdx",
  );

  const rawContent = fs.readFile(contentPath, "utf-8");

  return rawContent;
};

const stripMdxForExcerpt = (text: string): string =>
  text
    .replace(/<[A-Za-z][A-Za-z0-9]*[\s\S]*?<\/[A-Za-z][A-Za-z0-9]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\|[^\n]*\|$/gm, "")
    .replace(/[#*_~`<>]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const extractExcerptFromMdx = (content: string): string => {
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, "");
  const withoutTitle = withoutFrontmatter.replace(/^#\s+.+$/m, "");
  const plain = stripMdxForExcerpt(withoutTitle);

  const maxLength = 130;

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}…`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export interface SeoMetaDataConfig {
  title: string;
  description: string;
  wholeSlug: string | null;
  ogImage: string;
  publishedTime?: string;
  isFromIndexPage?: boolean;
  isFromBlogPage?: boolean;
}

export const getSeoMetaData = ({
  title,
  description,
  wholeSlug,
  ogImage,
  // publishedTime,
  isFromIndexPage,
  isFromBlogPage,
}: SeoMetaDataConfig): { finalMetadata: Metadata } => {
  const isProductionEnvironment =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  const url = `${SITE_CONSTANTS.siteUrl}${wholeSlug}`;
  const finalTitle = isFromIndexPage
    ? title
    : `${title} | ${SITE_CONSTANTS.siteName}`;

  return {
    finalMetadata: {
      referrer: "origin-when-cross-origin",
      // formatDetection -->  This prevents browsers (especially on mobile) from automatically linking email addresses,phone numbers, or addresses in your content. This is useful for preventing spam and phishing attacks.
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(SITE_CONSTANTS.siteUrl),
      ...(isProductionEnvironment
        ? {
            robots: {
              index: true,
              follow: true,
              googleBot: {
                index: true,
                follow: true,
              },
            },
          }
        : {
            robots: {
              index: false,
              follow: false,
              googleBot: {
                index: false,
                follow: false,
              },
            },
          }),
      title: finalTitle,
      ...(description && { description }),
      openGraph: {
        title: finalTitle,
        ...(description && { description }),
        type: isFromBlogPage ? "article" : "website",
        /// TODO: add publishedTime
        // publishedTime,
        url,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        title: finalTitle,
        description,
        card: "summary_large_image",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
          },
        ],
      },
      // all urls are self canonical
      alternates: {
        canonical: url,
      },
    },
  };
};
