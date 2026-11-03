"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { ProjectCard, ProjectImage } from "./project-card";

const filters = [
  { id: "all", label: "All" },
  { id: "real", label: "Real Project" },
  { id: "exploration", label: "Exploration" },
] as const;

type Filter = (typeof filters)[number]["id"];

export function ProjectsShowcase({ projects, className }: { projects: readonly Project[]; className: string }) {
  const section = useRef<HTMLElement>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || (project.category ?? "real") === filter,
  );

  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      if (element.dataset.reveal === "waiting") element.dataset.reveal = "visible";
      observer.disconnect();
    }, { rootMargin: "0px 0px -65% 0px" });

    element.dataset.reveal = "waiting";
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  function finishReveal() {
    if (section.current) section.current.dataset.reveal = "done";
  }

  function selectFilter(value: Filter) {
    finishReveal();
    setFilter(value);
  }

  function openPreview(project: Project) {
    setPreview(project);
    previewDialog.current?.showModal();
  }

  return (
    <section
      ref={section}
      id="projects"
      aria-labelledby="projects-title"
      className={`${className} group/projects snap-start snap-always bg-accent pb-[clamp(4rem,8vw,7rem)]`}
      onFocusCapture={finishReveal}
    >
      <header className="relative grid justify-items-center overflow-hidden pt-[clamp(5rem,9.4vw,7.75rem)] motion-safe:group-data-[reveal=waiting]/projects:opacity-0 motion-safe:group-data-[reveal=visible]/projects:animate-project-heading">
        <span aria-hidden="true" className="pointer-events-none absolute top-[clamp(1.4rem,2.45vw,2rem)] left-1/2 -translate-x-1/2 text-[clamp(3.3rem,10.3vw,10rem)] leading-none font-bold tracking-[.13em] whitespace-nowrap text-[#ededed]">
          PORTFOLIO
        </span>
        <h2 id="projects-title" className="relative translate-y-0.5 text-center text-[clamp(2rem,4.3vw,3.5rem)] leading-[1.05] font-[520] tracking-[-.018em] uppercase">
          /Selected Work
        </h2>
      </header>

      <div className="mx-auto mt-[clamp(2.5rem,6.2vw,5.125rem)] w-[76.5%] max-w-[75rem] compact:w-[90%]">
        <div className="mb-[clamp(1.65rem,3.8vw,3.125rem)] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 motion-safe:group-data-[reveal=waiting]/projects:opacity-0 motion-safe:group-data-[reveal=visible]/projects:animate-project-toolbar">
          <div className="flex flex-wrap items-center gap-x-[clamp(.85rem,2.3vw,2rem)]" aria-label="Filter projects" role="group">
            {filters.map(({ id, label }) => (
              <Button
                key={id}
                variant="ghost"
                type="button"
                aria-pressed={filter === id}
                onClick={() => selectFilter(id)}
                className="h-10 rounded-none px-0 text-sm font-medium underline-offset-4 hover:underline aria-pressed:font-semibold sm:text-base"
              >
                {label}
              </Button>
            ))}
          </div>
          <Button asChild variant="outline" size="pill" className="px-5 text-sm font-medium shadow-none sm:text-base">
            <a href="#project-gallery" onClick={() => selectFilter("all")}>
              View All Work
              <svg aria-hidden="true" className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M3.5 12.5 12 4m-7 0h7v7" />
              </svg>
            </a>
          </Button>
        </div>

        <div id="project-gallery" className="scroll-mt-5" tabIndex={-1}>
          {visibleProjects.length ? (
            <ul className="grid list-none gap-[clamp(1.5rem,3.8vw,3.125rem)] p-0 sm:grid-cols-2" aria-label="Selected projects">
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onPreview={openPreview} />
              ))}
            </ul>
          ) : (
            <p className="border-y border-border py-10 text-[#696969]" role="status">
              No projects in this category yet.
            </p>
          )}
        </div>
      </div>
      <dialog
        ref={previewDialog}
        aria-labelledby="project-preview-title"
        className="fixed inset-0 m-auto max-h-[90svh] w-[min(90vw,52rem)] overflow-auto overscroll-contain rounded-2xl border border-border bg-background p-4 text-foreground backdrop:bg-black/55 sm:p-5"
        onClose={() => setPreview(null)}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 id="project-preview-title" className="text-base font-medium sm:text-xl">{preview?.title}</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => previewDialog.current?.close()}>
            Close
          </Button>
        </div>
        {preview && (
          <div className="relative aspect-[47/33.5] overflow-hidden">
            <ProjectImage project={preview} sizes="(max-width: 924px) 90vw, 832px" />
          </div>
        )}
      </dialog>
    </section>
  );
}
