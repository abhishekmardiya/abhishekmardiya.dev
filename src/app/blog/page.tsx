import type { Metadata } from "next";
import { BlogLinks } from "@/component/BlogLinks";
import { GoHomeLink } from "@/component/GoHomeLink";
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
      <GoHomeLink className="sm:mt-4 mb-6 sm:mb-8" />
      <h1 className="mb-6 text-2xl font-semibold tracking-tighter sm:mb-8 sm:text-3xl">
        Blog
      </h1>

      <div className="my-6 sm:my-8">
        <BlogLinks />
      </div>
    </section>
  );
}
