import Link from "next/link";
import { sectionFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { projects, smartEggSorter, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionReveal } from "../section-reveal";
import { FeaturedProject } from "./featured-project";
import { ProjectList } from "./project-list";

const projectPreviews = [
  { id: "preview-web-app", title: "Full-Stack Web App", subtitle: "Project details coming soon" },
  { id: "preview-website", title: "Responsive Website", subtitle: "Project details coming soon" },
] satisfies readonly Project[];

const reveal = "[--hero-slide-from:1.25rem] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal";

export function ProjectsSection() {
  const selected = [
    ...projects.filter((project) => project.id !== smartEggSorter.id),
    ...projectPreviews,
  ].slice(0, 2);

  return (
    <SectionReveal id="projects" className={cn("min-h-svh snap-start snap-always bg-accent pb-[clamp(3rem,7vw,6rem)]", sectionFont.className)}>
      <header className="relative grid justify-items-center overflow-hidden pt-[clamp(5rem,9.4vw,7.75rem)] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-project-heading">
        <span aria-hidden="true" className="pointer-events-none absolute top-[clamp(1.4rem,2.45vw,2rem)] left-1/2 -translate-x-1/2 text-[clamp(3.3rem,10.3vw,10rem)] leading-none font-bold tracking-[.13em] whitespace-nowrap text-[#ededed]">
          PORTFOLIO
        </span>
        <h2 id="projects-title" className="relative text-center text-[clamp(2rem,4.3vw,3.5rem)] leading-[1.05] font-[520] tracking-[-.018em] uppercase">
          /Projects
        </h2>
      </header>

      <div className="mx-auto mt-[clamp(2rem,4.8vw,4.5rem)] w-[90.6%] max-w-[75rem]">
        <div className={cn(reveal, "[--section-enter-delay:.25s]")}>
          <FeaturedProject />
        </div>

        <div className={cn(reveal, "mt-[clamp(2rem,4.5vw,4rem)] [--section-enter-delay:.4s]")}>
          <ProjectList projects={selected} />
        </div>

        <div className={cn(reveal, "mt-4 flex justify-end [--section-enter-delay:.55s]")}>
          <Button asChild variant="link" className="min-h-11 px-0 text-sm font-semibold sm:text-base">
            <Link href="/projects">View more <span aria-hidden="true">↗</span></Link>
          </Button>
        </div>
      </div>
    </SectionReveal>
  );
}
