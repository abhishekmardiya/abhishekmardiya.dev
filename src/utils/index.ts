import { promises as fs } from "node:fs";
import path from "node:path";

export const getBlogSlugs = async (): Promise<string[]> => {
  const contentDir = path.join(process.cwd(), "src", "content", "posts");
  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  const slugs = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const pagePath = path.join(contentDir, entry.name, "page.mdx");
        try {
          await fs.access(pagePath);
          return `blog/${entry.name}`;
        } catch {
          return null;
        }
      }),
  );

  return slugs.filter((slug): slug is string => slug !== null);
};

export const getAllBlogRoutes = async (): Promise<{
  blogRoutes: string[];
  allRoutes: string[];
}> => {
  const blogRoutes = await getBlogSlugs();

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
    "content",
    "posts",
    slug,
    "page.mdx",
  );

  const rawContent = fs.readFile(contentPath, "utf-8");

  return rawContent;
};
