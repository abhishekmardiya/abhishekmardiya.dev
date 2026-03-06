import type { MetadataRoute } from "next";
import { SITE_CONSTANTS } from "@/constants";
import { getAllBlogFullSlugs } from "@/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { blogSlugs } = await getAllBlogFullSlugs();

  const allRoutes = ["", "/blog", ...blogSlugs.map((route) => route.slug)];

  return allRoutes.map((slug) => ({
    url: `${SITE_CONSTANTS.siteUrl}${slug}`,
    lastModified: new Date().toISOString(),
  }));
}
