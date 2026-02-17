import { BlogLinks } from "@/component/BlogLinks";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Abhishek Mardiya
      </h1>

      <p>
        {
          "I'm a developer dedicated to writing clean, maintainable code. I enjoy sharing insights about JavaScript patterns, optimization techniques, and practical strategies for building efficient and reliable projects. When I'm not coding, you'll find me relaxing with a good movie or TV series."
        }
      </p>

      <div className="my-8">
        <h2 className="mb-4 text-xl font-medium">Blog Posts</h2>
        <BlogLinks />
      </div>
    </section>
  );
}
