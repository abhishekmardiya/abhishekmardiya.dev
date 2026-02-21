import type { MetadataRoute } from "next";
import { SITE_CONSTANTS } from "@/constants";
import { getAllSlug } from "@/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allRoutes } = await getAllSlug();

  return allRoutes.map((slug) => ({
    url: `${SITE_CONSTANTS.siteUrl}${slug}`,
    lastModified: new Date().toISOString(),
  }));
}
