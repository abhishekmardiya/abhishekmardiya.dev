import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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

  try {
    const title = formatSlugToTitle(slug);

    return {
      title,
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
    };
  } catch {
    return { title: "Blog Post Not Found" };
  }
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
    <article className="markdown prose prose-sm prose-invert max-w-none sm:prose-base">
      <MDXRemote
        source={content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
  );
}
