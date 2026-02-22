export interface SeoMetaDataConfig {
  title: string;
  description: string;
  wholeSlug: string | null;
  ogImage: string;
  publishedTime?: string;
  isFromIndexPage?: boolean;
  isFromBlogPage?: boolean;
}
