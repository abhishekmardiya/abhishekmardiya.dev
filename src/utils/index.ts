import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { SITE_CONSTANTS } from "@/constants";
import { REGEX } from "@/constants/regex";

// Markdown
export const parseFrontmatter = (fileContent: string) => {
  const match = REGEX.MDX_FRONTMATTER_EXTRACT.exec(fileContent);

  if (!match) {
    return {
      metadata: {},
      content: fileContent,
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(REGEX.MDX_FRONTMATTER_EXTRACT, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Record<string, string> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(":");
    let value = valueArr.join(":").trim();
    value = value.replace(REGEX.QUOTES, "$1"); // Remove quotes
    if (key) {
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content };
};

export const readBlogMDXFile = async ({
  slug,
}: {
  slug: string;
}): Promise<{
  title: string;
  excerpt: string;
  publishedAt: string;
  content: string;
}> => {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "posts",
    slug,
    "page.mdx"
  );

  const rawContent = await fs.readFile(contentPath, "utf-8");

  const {
    metadata: { title, excerpt, publishedAt },
    content,
  } = parseFrontmatter(rawContent);

  return {
    title,
    excerpt,
    publishedAt,
    content,
  };
};

export const getAllBlogFullSlugs = async (): Promise<{
  blogSlugs: { slug: string; title: string }[];
}> => {
  const contentDir = path.join(process.cwd(), "src", "posts");
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  const slugs = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        try {
          const { title } = await readBlogMDXFile({ slug: entry.name });

          return { slug: `/blog/${entry.name}`, title };
        } catch {
          return null;
        }
      })
  );

  const blogSlugs = slugs.filter(
    (item): item is { slug: string; title: string } => item !== null
  );

  return {
    blogSlugs,
  };
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(REGEX.WHITESPACES, "-")
    .replace(REGEX.SLUG_INVALID_CHARS, "");
};

// Text to speech
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

// SEO
interface SeoMetaDataConfig {
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
  publishedTime,
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
        ...(isFromBlogPage && { publishedTime }),
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

export const getBlogJsonLd = ({
  title,
  excerpt,
  slug,
  publishedTime,
}: {
  title: string;
  excerpt: string;
  slug: string;
  publishedTime: string;
}): { ldJsonSchema: string } => {
  //  api route
  const { ogImage } = getOgImage(title);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: new Date(publishedTime).toISOString(),
    dateModified: new Date().toISOString(),
    description: excerpt,
    image: ogImage,
    url: `${SITE_CONSTANTS.siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: SITE_CONSTANTS.siteName,
      url: SITE_CONSTANTS.siteUrl,
    },
  };

  return {
    ldJsonSchema: JSON.stringify(schema).replace(
      REGEX.JSON_LD_LESS_THAN,
      "\\u003c"
    ),
  };
};
