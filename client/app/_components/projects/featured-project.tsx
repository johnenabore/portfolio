import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./project-card";
import { ProjectLink } from "./project-transition";

export function FeaturedProject({ project, placeholder, onPreview }: {
  project: Project;
  placeholder: boolean;
  onPreview: (project: Project) => void;
}) {
  const { title, subtitle, description, tags, href } = project;
  const action = (
    <>
      {href ? (placeholder ? "Read case study" : "View project") : placeholder ? "Preview concept" : "Preview project"}
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 12.5 12 4m-7 0h7v7" />
      </svg>
    </>
  );

  return (
    <article
      aria-labelledby="featured-project-title"
      className="relative mb-[clamp(2.5rem,6vw,5rem)] grid overflow-hidden rounded-2xl bg-primary text-primary-foreground site-motion:group-data-[reveal=waiting]/projects:opacity-0 site-motion:group-data-[reveal=visible]/projects:animate-project-toolbar lg:grid-cols-[1fr_1.45fr]"
    >
      <div className="flex min-w-0 flex-col justify-center p-[clamp(1.35rem,3.5vw,3.5rem)]">
        <p className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[.15em] text-white/75 uppercase">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#b9d7aa]" />
          Featured project
        </p>
        <h3 id="featured-project-title" className="text-[clamp(2.35rem,5vw,4.65rem)] leading-[.95] font-semibold tracking-[-.065em]">{title}</h3>
        {subtitle && <p className="mt-3 text-base font-medium text-white/85">{subtitle}</p>}
        {description && <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/75 sm:text-base">{description}</p>}
        {tags?.length ? (
          <ul aria-label="Featured project tags" className="mt-5 flex list-none flex-wrap gap-2 p-0">
            {tags.map((tag) => (
              <li key={tag}><Badge variant="outline" className="border-white/25 bg-transparent px-3 py-1 text-white">{tag}</Badge></li>
            ))}
          </ul>
        ) : null}
        <div className="mt-6">
          {href ? (
            <Button asChild size="pill" variant="outline" className="min-h-11 text-sm text-foreground focus-visible:ring-white">
              <ProjectLink href={href} projectTitle={title} className="after:absolute after:inset-0 after:z-10">{action}</ProjectLink>
            </Button>
          ) : (
            <Button type="button" size="pill" variant="outline" className="min-h-11 text-sm text-foreground focus-visible:ring-white" aria-haspopup="dialog" onClick={() => onPreview(project)}>
              {action}
            </Button>
          )}
        </div>
      </div>

      <div className="relative grid min-w-0 place-items-center border-t border-white/15 bg-[#e9ede4] p-3 sm:p-5 lg:border-t-0 lg:border-l">
        <div className="relative aspect-[47/33.5] w-full overflow-hidden rounded-lg border border-black/10">
          <ProjectImage project={project} sizes="(max-width: 1023px) 90vw, 680px" />
        </div>
        {placeholder && <span className="absolute top-5 right-5 rounded-full bg-[#e9ede4] px-2.5 py-1 text-[.625rem] font-semibold tracking-[.1em] text-foreground uppercase sm:top-7 sm:right-7">Placeholder artwork</span>}
      </div>
    </article>
  );
}
