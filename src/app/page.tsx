import type { Metadata } from "next";
import Link from "next/link";
import { BlogLinks } from "@/component/BlogLinks";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Abhishek Mardiya | Software Developer Engineer",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Abhishek Mardiya
      </h1>

      <p>
        {
          "I'm a Software Developer Engineer focused on building scalable, high-performance web applications. I enjoy working with modern JavaScript ecosystems, crafting clean architecture, and turning complex problems into simple, efficient solutions. I'm passionate about continuous learning and building products that deliver real impact."
        }
      </p>

      <div className="my-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-medium">Blog</h2>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            View all
          </Link>
        </div>
        <BlogLinks isFromIndexPage />
      </div>
    </section>
  );
}
