import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const stripMdxForExcerpt = (text) =>
  text
    .replace(/<[A-Za-z][A-Za-z0-9]*[\s\S]*?<\/[A-Za-z][A-Za-z0-9]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\|[^\n]*\|$/gm, "")
    .replace(/[#*_~`<>]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractTitle = (content) => {
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : "";
};

const extractExcerpt = (content, maxLength = 150) => {
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, "");
  const withoutTitle = withoutFrontmatter.replace(/^#\s+.+$/m, "");
  const plain = stripMdxForExcerpt(withoutTitle);
  if (plain.length <= maxLength) {
    return plain;
  }
  return `${plain.slice(0, maxLength).trim()}…`;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const extractSections = (content, snippetMaxLength = 80) => {
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, "");
  const sections = [];
  const parts = withoutFrontmatter.split(/^(#{2,3})\s+(.+)$/gm);

  for (let i = 1; i < parts.length; i += 3) {
    const heading = parts[i + 1]?.trim() ?? "";
    const bodyRaw = parts[i + 2] ?? "";
    const body = stripMdxForExcerpt(bodyRaw);
    const snippet =
      body.length <= snippetMaxLength
        ? body
        : `${body.slice(0, snippetMaxLength).trim()}…`;

    sections.push({ heading, snippet });
  }

  return sections;
};

const buildSearchIndex = async () => {
  const contentDir = join(process.cwd(), "src", "content", "posts");
  const entries = await readdir(contentDir, { withFileTypes: true });

  const docs = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const pagePath = join(contentDir, entry.name, "page.mdx");
    let content;
    try {
      content = await readFile(pagePath, "utf-8");
    } catch {
      continue;
    }

    const title = extractTitle(content) || entry.name.replace(/-/g, " ");
    const slug = `/blog/${entry.name}`;
    const excerpt = extractExcerpt(content);

    docs.push({
      type: "page",
      id: slug,
      title,
      slug,
      excerpt,
    });

    const sections = extractSections(content);
    for (const { heading, snippet } of sections) {
      const sectionId = `${slug}#${slugify(heading)}`;
      docs.push({
        type: "section",
        id: sectionId,
        parentSlug: slug,
        parentTitle: title,
        heading,
        snippet,
      });
    }
  }

  const outPath = join(process.cwd(), "public", "search-index.json");
  const { writeFile, mkdir } = await import("node:fs/promises");
  await mkdir(join(process.cwd(), "public"), { recursive: true });
  await writeFile(outPath, JSON.stringify(docs), "utf-8");
  console.log(`Built search index: ${docs.length} documents`);
};

buildSearchIndex().catch((err) => {
  console.error(err);
  process.exit(1);
});
