import type { Project } from "@/data/projects";
import { ProjectLink } from "./project-transition";

type ProjectListProps = {
  projects: readonly Project[];
  titleLevel?: "h2" | "h3";
};

export function ProjectList({ projects, titleLevel: Title = "h3" }: ProjectListProps) {
  return (
    <ul className="list-none divide-y divide-black/15 border-y border-black/15 p-0">
      {projects.map(({ id, title, subtitle, description, href }) => (
        <li key={id}>
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 sm:py-6">
            <div>
              <Title className="text-[clamp(1.25rem,2.25vw,2rem)] leading-tight font-medium tracking-[-.04em]">
                {href ? (
                  <ProjectLink
                    href={href}
                    projectTitle={title}
                    className="underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:underline"
                  >
                    {title}
                  </ProjectLink>
                ) : title}
              </Title>
              {(subtitle || description) && <p className="mt-1 text-sm text-ring">{subtitle ?? description}</p>}
            </div>
            {href && <span aria-hidden="true" className="text-xl">↗</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
