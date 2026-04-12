# Abhishek Mardiya Portfolio

Personal portfolio and blog built with Next.js, TypeScript, Tailwind CSS, and MDX.

The site is focused on:

- a fast personal homepage
- a technical blog powered by local MDX files
- strong SEO metadata and OG image generation
- searchable articles with section-level search
- small quality-of-life features like copy-to-clipboard and text-to-speech for posts

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `MDX` via `next-mdx-remote`
- `Biome` for linting and formatting
- `FlexSearch` for client-side blog search
- `Vercel Analytics` and `Speed Insights`

## Project Structure

```txt
src/
  app/                  Next.js App Router pages and routes
  component/            Reusable UI and blog components
  constants/            Shared site constants and regex patterns
  posts/                Blog content as MDX folders
  utils/                MDX parsing, SEO, reading-time, and blog helpers
scripts/
  build-search-index.mjs
public/
  search-index.json     Generated search index
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

1. In a separate terminal, run TypeScript in watch mode:

```bash
npm run ts
```

The app runs locally at `[http://localhost:3000](http://localhost:3000)`.

## Available Scripts

```bash
npm run dev
npm run ts
npm run lint
npm run format
npm run build
npm run start
```

## Writing Blog Posts

Each post lives in its own folder inside `src/posts` and should be named `page.mdx`.

Example:

```txt
src/posts/my-post-slug/page.mdx
```

Required frontmatter:

```md
---
title: "My Post Title"
publishedAt: "2026-04-12"
excerpt: "Short summary for SEO and previews."
---
```

Recommended body pattern:

- `<DateStamp>Month Year</DateStamp>`
- `##` and `###` headings
- fenced code blocks
- optional inline MDX components such as `Image`

## Search

The blog search index is generated from MDX files using `scripts/build-search-index.mjs`.

- `npm run dev` rebuilds the index before starting Next.js
- `npm run build` rebuilds the index before production builds
- the generated file is written to `public/search-index.json`

Search supports:

- full post matches
- section-level matches
- `Cmd+K` or `Ctrl+K` keyboard access

## Features

- homepage with blog previews
- blog index and statically generated blog pages
- markdown response route for posts
- dynamic OG image generation
- SEO metadata, sitemap, and robots support
- custom MDX rendering with copy-code blocks
- client-side text-to-speech for articles

## Code Quality

- `Biome` handles linting and formatting
- `Husky` is set up for git hooks

Format and lint before shipping changes:

```bash
npm run format
npm run lint
```
