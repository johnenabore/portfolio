import Image from "next/image";
import { caseStudies } from "@/data/projects";
import { ProjectLink } from "./project-transition";

// Closes a case study with a large link to the next one, so visitors keep browsing.
export function NextProject({ currentId }: { currentId: (typeof caseStudies)[number]["id"] }) {
  const index = caseStudies.findIndex(({ id }) => id === currentId);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <section aria-labelledby="next-project-title" data-case-group className="mt-[clamp(3.5rem,8vw,7rem)] border-t border-border pt-5">
      <ProjectLink
        href={next.href}
        projectTitle={next.title}
        className="group/next grid items-end gap-x-[6%] gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(14rem,24rem)]"
      >
        <div className="min-w-0">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[.16em] text-ring uppercase">
            Next project
            <span aria-hidden="true" className="font-mono tracking-normal">
              {String(caseStudies.indexOf(next) + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
            </span>
          </p>
          <h2
            id="next-project-title"
            className="mt-3 text-[clamp(2.8rem,8.5vw,7.5rem)] leading-[.9] font-semibold tracking-[-.075em] underline-offset-[.12em] decoration-[.04em] group-hover/next:underline group-focus-visible/next:underline"
          >
            {next.title}
            <span
              aria-hidden="true"
              className="ms-[.15em] inline-block text-[.55em] align-[.35em] site-motion:transition-transform site-motion:duration-300 site-motion:group-hover/next:translate-x-2 site-motion:group-hover/next:-translate-y-2"
            >
              ↗
            </span>
          </h2>
          <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-ring sm:text-base">{next.subtitle}</p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[1.1rem] bg-white outline-[.45rem] outline-black/[.055]">
          <Image
            src={next.thumbnail.src}
            alt=""
            fill
            sizes="(min-width: 768px) 24rem, 91vw"
            className="object-cover site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro site-motion:group-hover/next:scale-[1.05]"
          />
        </div>
      </ProjectLink>
    </section>
  );
}
