import { SITE_CONSTANTS } from "@/constants";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${SITE_CONSTANTS.siteUrl}/sitemap.xml`,
  };
}
