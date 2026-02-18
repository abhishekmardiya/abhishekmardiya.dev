import { BlogLinks } from "@/component/BlogLinks";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Abhishek Mardiya
      </h1>

      <p>
        {
          "I'm Abhishek a Software Developer Engineer focused on building scalable, high-performance web applications.I enjoy working with modern JavaScript ecosystems, crafting clean architecture, and turning complex problems into simple, efficient solutions. I'm passionate about continuous learning and building products that deliver real impact."
        }
      </p>

      <div className="my-8">
        <h2 className="mb-4 text-xl font-medium">Blog Posts</h2>
        <BlogLinks />
      </div>
    </section>
  );
}
