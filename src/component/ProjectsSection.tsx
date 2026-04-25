import type { ReactElement } from "react";
import { PROJECTS } from "@/constants";

const projectLinkClassName: string =
  "text-sm text-zinc-600 underline underline-offset-4 decoration-zinc-400 transition-colors hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-blue-500 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-blue-400 dark:active:text-blue-300";

export const ProjectsSection = (): ReactElement => {
  return (
    <section
      id="projects"
      className="mt-6 sm:mt-8"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="mb-4 text-lg font-medium text-zinc-900 sm:text-xl dark:text-zinc-100"
      >
        Projects
      </h2>
      <ul className="space-y-4">
        {PROJECTS.map((project) => (
          <li
            key={project.title}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/50"
          >
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={projectLinkClassName}
              >
                Live demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={projectLinkClassName}
              >
                GitHub
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
