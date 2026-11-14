import Link from "next/link";
import { sectionFont } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { projects, smartEggSorter, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionReveal } from "../section-reveal";
import { FeaturedProject } from "./featured-project";
import { ProjectList } from "./project-list";
import { ProjectListReveal } from "./project-list-reveal";

const projectPreviews = [
  { id: "next-project", title: "Next project", subtitle: "Coming soon" },
  { id: "future-project", title: "More work in progress" },
] satisfies readonly Project[];

export function ProjectsSection() {
  const selected = [
    ...projects.filter((project) => project.id !== smartEggSorter.id),
    ...projectPreviews,
  ].slice(0, 2);

  return (
    <SectionReveal id="projects" className={cn("min-h-svh snap-start snap-always bg-accent pb-[clamp(3rem,7vw,6rem)]", sectionFont.className)}>
      <header className="relative grid justify-items-center overflow-hidden pt-[clamp(5rem,9.4vw,7.75rem)]">
        <span aria-hidden="true" className="pointer-events-none absolute top-[clamp(1.4rem,2.45vw,2rem)] left-1/2 -translate-x-1/2 text-[clamp(3.3rem,10.3vw,10rem)] leading-none font-bold tracking-[.13em] whitespace-nowrap text-[#ededed] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-project-heading">
          PORTFOLIO
        </span>
        <div className="relative overflow-hidden pb-0.5">
          <h2 id="projects-title" className="text-center text-[clamp(2rem,4.3vw,3.5rem)] leading-[1.05] font-[520] tracking-[-.018em] uppercase [--section-enter-delay:.1s] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal">
            /Projects
          </h2>
        </div>
      </header>

      <div className="mx-auto mt-[clamp(2rem,4.8vw,4.5rem)] w-[90.6%] max-w-[75rem]">
        <FeaturedProject />

        <div className="mt-[clamp(2rem,4.5vw,4rem)]">
          <ProjectListReveal>
            <ProjectList projects={selected} />

            <div data-project-row="" className="group/more mt-4 flex justify-end [--project-row-delay:160ms] site-motion:data-[project-row=waiting]:opacity-0 site-motion:data-[project-row=visible]:animate-project-row">
              <Button asChild variant="link" className="min-h-11 px-0 text-sm font-semibold sm:text-base">
                <Link href="/projects">
                  View more
                  <span aria-hidden="true" className="site-motion:transition-transform site-motion:duration-300 site-motion:group-hover/more:translate-x-1 site-motion:group-hover/more:-translate-y-1">↗</span>
                </Link>
              </Button>
            </div>
          </ProjectListReveal>
        </div>
      </div>
    </SectionReveal>
  );
}
