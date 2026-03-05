import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SITE_CONSTANTS } from "@/constants";
import { REGEX } from "@/constants/regex";
import type { SeoMetaDataConfig } from "@/interfaces";

export const getAllSlug = async (): Promise<{
  blogRoutes: { slug: string; title: string }[];
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
          const content = await fs.readFile(pagePath, "utf-8");
          const titleMatch = content.match(REGEX.MDX_HEADING_1);
          const title = titleMatch ? titleMatch[1] : "";
          return { slug: `/blog/${entry.name}`, title: title.trim() };
        } catch {
          return null;
        }
      })
  );

  const blogRoutes = slugs.filter(
    (item): item is { slug: string; title: string } => item !== null
  );

  return {
    blogRoutes,
    allRoutes: ["", ...blogRoutes.map((route) => route.slug)],
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

export const readBlogMDXFile = ({
  slug,
}: {
  slug: string;
}): Promise<string> => {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "posts",
    slug,
    "page.mdx"
  );

  const rawContent = fs.readFile(contentPath, "utf-8");

  return rawContent;
};

export const stripMdxForSpeech = (text: string): string =>
  text
    .replace(REGEX.MDX_HTML_TAGS, "")
    .replace(REGEX.MDX_CODE_BLOCKS, "")
    .replace(REGEX.MDX_LINKS, "$1")
    .replace(REGEX.MDX_TABLE_ROWS, "")
    .replace(REGEX.MDX_SPECIAL_CHARS, "")
    .replace(REGEX.NEWLINES, " ")
    .replace(REGEX.WHITESPACES, " ")
    .trim();

export const calculateReadingTime = (content: string): number => {
  const plainText = stripMdxForSpeech(content);
  const words = plainText
    .split(REGEX.WHITESPACES_SINGLE)
    .filter((word) => word.length > 0).length;
  return Math.ceil(words / 200);
};

export const extractExcerptFromMdx = (content: string): string => {
  const withoutFrontmatter = content.replace(REGEX.MDX_FRONTMATTER, "");
  const withoutTitle = withoutFrontmatter.replace(
    REGEX.MDX_HEADING_1_NO_CAPTURE,
    ""
  );
  const plain = stripMdxForSpeech(withoutTitle);

  const maxLength = 130;

  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trim()}…`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(REGEX.WHITESPACES, "-")
    .replace(REGEX.SLUG_INVALID_CHARS, "");
};

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

export const getOgImage = (title: string) => {
  const ogImage = `${SITE_CONSTANTS.siteUrl}/og/${encodeURIComponent(title)}`;

  return {
    ogImage,
  };
};
