import type { Project } from "./projects";
import { PROJECTS } from "./projects";

export type { Project };
export { PROJECTS };

type SiteConstants = {
  siteUrl: string;
  siteName: string;
  profession: string;
  linkedinUrl: string;
  githubUrl: string;
  nextJsContributionsUrl: string;
};

export const SITE_CONSTANTS: SiteConstants = {
  siteUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://abhishekmardiya.dev",
  siteName: "Abhishek Mardiya",
  profession: "Frontend Engineer",
  linkedinUrl: "https://linkedin.com/in/abhishekmardiya",
  githubUrl: "https://github.com/abhishekmardiya",
  nextJsContributionsUrl:
    "https://github.com/vercel/next.js/pulls?q=is%3Apr+author%3Aabhishekmardiya+is%3Amerged",
};
