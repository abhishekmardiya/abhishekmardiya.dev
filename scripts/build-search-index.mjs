import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const REGEX = {
  MDX_HTML_TAGS: /<[A-Za-z][A-Za-z0-9]*[\s\S]*?<\/[A-Za-z][A-Za-z0-9]*>/g,
  MDX_CODE_BLOCKS: /```[\s\S]*?```/g,
  MDX_LINKS: /\[([^\]]+)\]\([^)]+\)/g,
  MDX_TABLE_ROWS: /^\|[^\n]*\|$/gm,
  MDX_SPECIAL_CHARS: /[#*_~`<>]/g,
  NEWLINES: /\n+/g,
  WHITESPACES: /\s+/g,
  MDX_HEADING_1: /^#\s+(.+)$/m,
  MDX_HEADING_1_NO_CAPTURE: /^#\s+.+$/m,
  MDX_FRONTMATTER: /^---[\s\S]*?---/,
  SLUG_INVALID_CHARS: /[^a-z0-9-]/g,
  MDX_SECTIONS: /^(#{2,3})\s+(.+)$/gm,
  HYPHENS: /-/g,
};

const stripMdxForExcerpt = (text) =>
  text
    .replace(REGEX.MDX_HTML_TAGS, "")
    .replace(REGEX.MDX_CODE_BLOCKS, "")
    .replace(REGEX.MDX_LINKS, "$1")
    .replace(REGEX.MDX_TABLE_ROWS, "")
    .replace(REGEX.MDX_SPECIAL_CHARS, "")
    .replace(REGEX.NEWLINES, " ")
    .replace(REGEX.WHITESPACES, " ")
    .trim();

const extractTitle = (content) => {
  const h1Match = content.match(REGEX.MDX_HEADING_1);
  return h1Match ? h1Match[1].trim() : "";
};

const extractExcerpt = (content, maxLength = 150) => {
  const withoutFrontmatter = content.replace(REGEX.MDX_FRONTMATTER, "");
  const withoutTitle = withoutFrontmatter.replace(
    REGEX.MDX_HEADING_1_NO_CAPTURE,
    ""
  );
  const plain = stripMdxForExcerpt(withoutTitle);
  if (plain.length <= maxLength) {
    return plain;
  }
  return `${plain.slice(0, maxLength).trim()}…`;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(REGEX.WHITESPACES, "-")
    .replace(REGEX.SLUG_INVALID_CHARS, "");

const extractSections = (content, snippetMaxLength = 80) => {
  const withoutFrontmatter = content.replace(REGEX.MDX_FRONTMATTER, "");
  const sections = [];
  const parts = withoutFrontmatter.split(REGEX.MDX_SECTIONS);

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
  const contentDir = join(process.cwd(), "src", "posts");
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

    const title =
      extractTitle(content) || entry.name.replace(REGEX.HYPHENS, " ");
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
