import Image from "next/image";
import type { FeaturedProjectData } from "@/data/projects";
import { cn } from "@/lib/utils";
import { FeatureMedia } from "./feature-media";
import { ProjectLink } from "./project-transition";

const enter = "site-motion:group-data-[showcase=waiting]/showcase:opacity-0 site-motion:group-data-[showcase=visible]/showcase:animate-section-reveal";

export function FeaturedProject({ project, reverse = false }: { project: FeaturedProjectData; reverse?: boolean }) {
  const { title, description, href, thumbnail, contribution, label } = project;

  return (
    <article
      className={cn(
        "group/feature relative grid items-center gap-x-[6%] gap-y-6",
        reverse ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]" : "md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
      )}
    >
      {/* Card frame: a soft grey mat around the rounded artwork. */}
      <div className={cn("rounded-[clamp(1.25rem,2.4vw,1.9rem)] bg-black/[.055] p-[clamp(.4rem,.9vw,.7rem)] site-motion:transition-colors site-motion:duration-500 group-hover/feature:bg-black/[.085]", reverse && "md:order-last")}>
        <FeatureMedia className="aspect-[3/2] overflow-hidden rounded-[clamp(.9rem,1.8vw,1.4rem)] bg-white">
          <div className="absolute inset-0 overflow-hidden site-motion:group-data-[showcase=waiting]/showcase:opacity-0 site-motion:group-data-[showcase=visible]/showcase:animate-project-image">
            {/* Taller than the frame so the scroll parallax never shows an edge. */}
            <div className="absolute inset-x-0 -inset-y-[2.5%] [translate:0_var(--parallax-y,0)]">
              <Image
                src={thumbnail.src}
                alt={thumbnail.alt}
                fill
                sizes="(min-width: 1325px) 670px, (min-width: 768px) 52vw, 91vw"
                className="object-cover site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro site-motion:group-hover/feature:scale-[1.03] site-motion:group-focus-within/feature:scale-[1.03]"
              />
            </div>
          </div>
        </FeatureMedia>
      </div>

      <div className="min-w-0 md:py-4">
        <p className={cn("mb-3 text-sm text-ring [--hero-slide-from:.75rem] [--section-enter-delay:.19s] md:mb-4", enter)}>
          {label}
        </p>
        <div className="overflow-hidden pb-[.1em]">
          <h3 className={cn("max-w-[11ch] text-[clamp(2.25rem,5.25vw,4.85rem)] leading-[.98] font-[560] tracking-[-.065em] [--section-enter-delay:.26s]", enter)}>
            {title}
          </h3>
        </div>
        <p className={cn("mt-3 max-w-[34ch] text-sm leading-relaxed text-[#484848] [--hero-slide-from:1rem] [--section-enter-delay:.35s] sm:text-base", enter)}>
          {description}
        </p>

        <dl className={cn("mt-5 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/15 pt-4 [--hero-slide-from:1rem] [--section-enter-delay:.43s]", enter)}>
          <div>
            <dt className="text-xs text-ring">My role</dt>
            <dd className="mt-1 text-sm font-medium">{contribution}</dd>
          </div>
        </dl>

        <ProjectLink
          href={href}
          projectTitle={title}
          className="group/case-link mt-3 inline-flex min-h-11 items-center text-sm font-semibold after:absolute after:inset-0"
        >
          <span className={cn("inline-flex items-center gap-2 [--hero-slide-from:.75rem] [--section-enter-delay:.51s]", enter)}>
            <span className="underline decoration-black/35 underline-offset-4 group-hover/feature:decoration-current group-focus-visible/case-link:decoration-current">Read case study</span>
            <span aria-hidden="true" className="site-motion:transition-transform site-motion:duration-300 site-motion:group-hover/feature:translate-x-1 site-motion:group-hover/feature:-translate-y-1">↗</span>
          </span>
        </ProjectLink>
      </div>
    </article>
  );
}
