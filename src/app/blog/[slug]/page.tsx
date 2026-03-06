import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CopyPageButton } from "@/component/CopyPageButton";
import { GoHomeLink } from "@/component/GoHomeLink";
import { MDXComponents } from "@/component/MDXComponents";
import { TextToSpeech } from "@/component/TextToSpeech";
import {
  calculateReadingTime,
  getAllBlogFullSlugs,
  getBlogJsonLd,
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
  const { blogSlugs } = await getAllBlogFullSlugs();

  return blogSlugs.map((route) => ({
    slug: route.slug.replace("/blog/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { title, excerpt } = await readBlogMDXFile({ slug });

  //  api route
  const { ogImage } = getOgImage(title);
  const fullSlug = `/blog/${slug}`;

  const { finalMetadata } = getSeoMetaData({
    title,
    description: excerpt,
    wholeSlug: fullSlug,
    ogImage,
    isFromBlogPage: true,
  });

  return finalMetadata;
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const { title, excerpt, content } = await readBlogMDXFile({ slug });

  if (!content) {
    notFound();
  }

  const { ldJsonSchema } = getBlogJsonLd({ title, excerpt, slug });
  const components = MDXComponents();

  return (
    <div className="space-y-4">
      <script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJsonSchema,
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
