import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CopyPageButton } from "@/component/CopyPageButton";
import { GoHomeLink } from "@/component/GoHomeLink";
import { MDXComponents } from "@/component/MDXComponents";
import { TextToSpeech } from "@/component/TextToSpeech";
import { SITE_CONSTANTS } from "@/constants";
import { REGEX } from "@/constants/regex";
import {
  calculateReadingTime,
  extractExcerptFromMdx,
  formatSlugToTitle,
  getAllSlug,
  getOgImage,
  getSeoMetaData,
  readBlogMDXFile,
  stripMdxForSpeech,
} from "@/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { blogRoutes } = await getAllSlug();

  return blogRoutes.map((route) => ({
    slug: route.slug.replace("/blog/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  let content: string;
  try {
    content = await readBlogMDXFile({ slug });
  } catch {
    return { title: "Blog Post Not Found" };
  }

  const title = formatSlugToTitle(slug);
  const description = extractExcerptFromMdx(content);
  //  api route
  const { ogImage } = getOgImage(title);
  const fullSlug = `/blog/${slug}`;

  const { finalMetadata } = getSeoMetaData({
    title,
    description,
    wholeSlug: fullSlug,
    ogImage,
    isFromBlogPage: true,
  });

  return finalMetadata;
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  let content: string;
  try {
    content = await readBlogMDXFile({ slug });
  } catch {
    notFound();
  }

  const components = MDXComponents();

  const title = formatSlugToTitle(slug);
  const description = extractExcerptFromMdx(content);
  //  api route
  const { ogImage } = getOgImage(title);

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    // datePublished: publishedTime,
    // dateModified: publishedTime,
    description: description,
    image: ogImage,
    url: `${SITE_CONSTANTS.siteUrl}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: SITE_CONSTANTS.siteName,
    },
  };

  return (
    <div className="space-y-4">
      <script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ldJson).replace(
            REGEX.JSON_LD_LESS_THAN,
            "\\u003c"
          ),
        }}
      />

      <div className="sm:mt-10 flex flex-wrap items-center justify-between gap-4">
        <GoHomeLink />
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-sm text-gray-400 whitespace-nowrap">
            {calculateReadingTime(content)} min read
          </span>
          <TextToSpeech text={stripMdxForSpeech(content)} />
          <CopyPageButton content={content} />
        </div>
      </div>
      <article className="markdown prose prose-sm prose-invert max-w-none sm:prose-base">
        <MDXRemote
          source={content}
          components={components}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </div>
  );
}
