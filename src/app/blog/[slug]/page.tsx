import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CopyPageButton } from "@/component/CopyPageButton";
import { GoHomeLink } from "@/component/GoHomeLink";
import { MDXComponents } from "@/component/MDXComponents";
import { SITE_URL } from "@/constants";
import { formatSlugToTitle, getAllSlug, readBlogMDXFile } from "@/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const { blogRoutes } = await getAllSlug();

  return blogRoutes.map((slug) => ({ slug: slug.replace("/blog/", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return { title: "Blog Post Not Found" };
  }

  const title = formatSlugToTitle(slug);
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(title)}`;
  const fullSlug = `${SITE_URL}/blog/${slug}`;
  const description = "Blog post description";

  return {
    title,
    alternates: {
      canonical: fullSlug,
    },
    description,
    openGraph: {
      title,
      description,
      type: "article",
      // publishedTime,
      url: fullSlug,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
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

  return (
    <div className="space-y-4">
      <div className="sm:mt-10 flex items-center justify-between">
        <GoHomeLink />
        <CopyPageButton content={content} />
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
