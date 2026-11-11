import type { Metadata } from "next";
import Link from "next/link";
import { ProjectList } from "@/app/_components/projects/project-list";
import { sectionFont } from "@/app/fonts";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects | John Enabore",
  description: "Browse projects and case studies by John Enabore.",
};

export default function ProjectsPage() {
  return (
    <main className={cn("min-h-svh bg-accent text-foreground", sectionFont.className)}>
      <div className="mx-auto w-[90.6%] max-w-[75rem]">
        <nav aria-label="Project navigation" className="border-b border-black/15 py-2">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline">
            <span aria-hidden="true">←</span> Back to portfolio
          </Link>
        </nav>

        <div className="pt-[clamp(3rem,7vw,6rem)] pb-[clamp(3rem,8vw,7rem)]">
          <h1 data-project-entry className="mb-[clamp(2rem,4vw,3.75rem)] text-[clamp(3rem,8vw,7rem)] leading-none font-[560] tracking-[-.065em] site-motion:animate-case-title">
            Projects
          </h1>
          <div data-project-entry className="site-motion:animate-case-details">
            <ProjectList projects={projects} titleLevel="h2" />
          </div>
        </div>
      </div>
    </main>
  );
}
