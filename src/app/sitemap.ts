import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { getAllBlogRoutes } from "@/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allRoutes } = await getAllBlogRoutes();

  return allRoutes.map((slug) => ({
    url: `${SITE_URL}${slug === "" ? "" : `/${slug}`}`,
    lastModified: new Date().toISOString(),
  }));
}
