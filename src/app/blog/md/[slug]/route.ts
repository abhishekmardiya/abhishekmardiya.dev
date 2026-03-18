import { getAllBlogFullSlugs, readBlogMDXFile } from "@/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { blogSlugs } = await getAllBlogFullSlugs();

  return blogSlugs.map((route) => ({
    slug: route.slug.replace("/blog/", ""),
  }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { content } = await readBlogMDXFile({ slug: slug });

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
