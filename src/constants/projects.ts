export type Project = {
  readonly title: string;
  readonly description: string;
  readonly liveDemoUrl: string;
  readonly githubUrl: string;
};

export const PROJECTS: readonly Project[] = [
  {
    title: "OSV Watch",
    description:
      "OSV-based dependency vulnerability scanner with API integrations and a performance-focused UI (Lighthouse 100).",
    liveDemoUrl: "https://osv-watch.vercel.app",
    githubUrl: "https://github.com/abhishekmardiya/osv-watch",
  },
  {
    title: "Async Awaits",
    description:
      "Full-stack Q&A platform for developers with strong frontend UX and reusable components.",
    liveDemoUrl: "https://asyncawaits.com",
    githubUrl: "https://github.com/abhishekmardiya/async-awaits",
  },
];
