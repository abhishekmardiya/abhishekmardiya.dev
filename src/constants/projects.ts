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
      "OSV-based dependency vulnerability scanner with API integrations and a performance-focused UI.",
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
  {
    title: "Light Score",
    description:
      "Bulk PageSpeed Insights audits—performance, SEO, accessibility, and best practices—with progress tracking, desktop/mobile runs, and JSON/CSV export.",
    liveDemoUrl: "https://light-score.vercel.app",
    githubUrl: "https://github.com/abhishekmardiya/light-score",
  },
  {
    title: "Cognitive MCQ Analyzer",
    description:
      "Next.js app that ingests MCQs from PDF or text, evaluates them with Gemini via the AI SDK, streams structured results, and exports a downloadable PDF report.",
    liveDemoUrl: "https://cognitive-mcq-analyzer.vercel.app",
    githubUrl: "https://github.com/abhishekmardiya/cognitive-MCQ-analyzer",
  },
];
