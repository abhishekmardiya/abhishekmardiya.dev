import type { Metadata } from "next";
import { BlogLinks } from "@/component/BlogLinks";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-semibold tracking-tighter">Blog</h1>

      <div className="my-8">
        <BlogLinks />
      </div>
    </section>
  );
}
