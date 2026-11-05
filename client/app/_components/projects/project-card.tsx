import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { ProjectPlaceholder } from "./project-placeholder";
import { ProjectLink } from "./project-transition";

export function ProjectImage({ project, sizes }: { project: Project; sizes: string }) {
  const { image, artwork } = project;
  return image ? (
    <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
  ) : (
    <ProjectPlaceholder artwork={artwork} />
  );
}

export function ProjectCard({
  project,
  index,
  onPreview,
}: {
  project: Project;
  index: number;
  onPreview: (project: Project) => void;
}) {
  const { title, subtitle, href, category = "real", tags, description } = project;
  const arrow = (
    <span className="absolute top-1/2 left-1/2 grid size-13 -translate-1/2 place-items-center rounded-full bg-background text-foreground opacity-0 shadow-md group-hover/cover:opacity-100 group-focus-within/cover:opacity-100 group-focus-visible/card:opacity-100 site-motion:transition-opacity [@media(hover:none)]:opacity-100" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M3.5 12.5 12 4m-7 0h7v7" />
      </svg>
    </span>
  );
  const content = (
    <>
      <div className="group/cover relative aspect-[47/33.5] overflow-hidden">
        <div className="absolute inset-0 site-motion:transition-transform site-motion:duration-500 site-motion:group-hover/cover:scale-[1.025]">
          <ProjectImage project={project} sizes="(max-width: 639px) 90vw, 38vw" />
        </div>
        <Badge className="pointer-events-none absolute top-3 left-3 border-border bg-background px-2.5 py-1 text-[.65rem] font-medium text-foreground uppercase">
          {category === "real" ? "Real Project" : "Exploration"}
        </Badge>
        {href ? arrow : (
          <button
            type="button"
            className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
            aria-label={`Preview ${title}`}
            aria-haspopup="dialog"
            onClick={() => onPreview(project)}
          >
            {arrow}
          </button>
        )}
      </div>
      <div className="px-3 pt-[1.1rem] pb-[1.8rem]">
        <h3 className="text-[clamp(1.2rem,1.9vw,1.625rem)] leading-[1.5] font-[450] tracking-[-.035em] group-hover/card:font-medium sm:min-h-[3em]">
          {title}
          {subtitle && <span className="block">{subtitle}</span>}
        </h3>
        {description && <p className="mt-2 text-sm text-[#484848]">{description}</p>}
        {tags?.length ? (
          <ul aria-label="Project tags" className="mt-4 flex list-none flex-wrap gap-3 p-0">
            {tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium sm:text-base">{tag}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  return (
    <li
      className="border-4 border-white bg-accent shadow-[0_0_0_1px_#1616160d,0_10px_50px_#1717171c] site-motion:group-data-[reveal=waiting]/projects:opacity-0 site-motion:group-data-[reveal=visible]/projects:animate-project-card"
      style={{ animationDelay: `${880 + Math.min(index, 3) * 120}ms` }}
    >
      {href ? (
        <ProjectLink href={href} projectTitle={title} className="group/card block h-full focus-visible:outline-2 focus-visible:outline-ring">
          {content}
        </ProjectLink>
      ) : (
        <article className="group/card">{content}</article>
      )}
    </li>
  );
}
