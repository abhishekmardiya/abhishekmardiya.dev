# AI Assistant Instructions

This is a Next.js-based personal website and blog for abhishekmardiya.dev. The codebase uses TypeScript, TailwindCSS, and MDX for content, following a component-based architecture with a focus on performance and SEO.

<!-- BEGIN:key-architecture-patterns -->

## Key Architecture Patterns

### TypeScript

- Every function and every constant must have an explicit type (return type for functions, explicit type annotation for constants).

### Code Quality Tools

- Uses Biome for linting/formatting (see `biome.json`)
- Format files using Biome (`npm run format`) after any new addition or deletion of code
- Husky for git hooks
- Keep components small and focused
- Lazy load components not needed on initial load (e.g. modals, dialogs); use `ssr: false` with `next/dynamic` to skip SSR/hydration
- Always run TypeScript in watch mode during development
- Do not define regular expressions inside functions. Shared patterns should be placed in `constants/regex.ts` and imported where needed. In JavaScript files, declare regex constants at the top of the file.

## Git Commit Messages

- Keep commit messages to 1-2 lines maximum
- Single line summary preferred (20-30 chars)
- No verbose explanations or bullet lists

<!-- END:key-architecture-patterns -->
