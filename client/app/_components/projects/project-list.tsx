import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { ProjectLink } from "./project-transition";

type ProjectListProps = {
  projects: readonly Project[];
  titleLevel?: "h2" | "h3";
};

export function ProjectList({ projects, titleLevel: Title = "h3" }: ProjectListProps) {
  return (
    <ul className="list-none border-t border-black/15 p-0">
      {projects.map(({ id, title, subtitle, description, href }, index) => (
        <li
          key={id}
          data-project-row=""
          className="border-b border-black/15 site-motion:data-[project-row=waiting]:opacity-0 site-motion:data-[project-row=visible]:animate-project-row"
          style={{ "--project-row-delay": index === 1 ? "90ms" : "0ms" } as CSSProperties}
        >
          <div className="group/project relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 sm:py-6">
            <div>
              <Title className="text-[clamp(1.25rem,2.25vw,2rem)] leading-tight font-medium tracking-[-.04em]">
                {href ? (
                  <ProjectLink
                    href={href}
                    projectTitle={title}
                    className="underline-offset-4 after:absolute after:inset-0 group-hover/project:underline focus-visible:underline"
                  >
                    {title}
                  </ProjectLink>
                ) : title}
              </Title>
              {(subtitle || description) && <p className="mt-1 text-sm text-ring">{subtitle ?? description}</p>}
            </div>
            {href && (
              <span aria-hidden="true" className="text-xl site-motion:transition-transform site-motion:duration-300 site-motion:group-hover/project:translate-x-1 site-motion:group-hover/project:-translate-y-1">
                ↗
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
