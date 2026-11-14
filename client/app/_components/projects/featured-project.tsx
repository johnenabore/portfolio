import Image from "next/image";
import { smartEggSorter } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectLink } from "./project-transition";

const enter = "site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal";

export function FeaturedProject() {
  const { title, description, href, image, contribution, duckTestAccuracy } = smartEggSorter;

  return (
    <article className="group/feature relative grid items-center gap-x-[6%] gap-y-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-[#d3cdb9]">
        <div className="absolute inset-0 overflow-hidden site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-project-image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1325px) 670px, (min-width: 768px) 52vw, 91vw"
            className="object-cover site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro site-motion:group-hover/feature:scale-[1.045] site-motion:group-focus-within/feature:scale-[1.045]"
          />
        </div>
      </div>

      <div className="min-w-0 md:py-4">
        <p className={cn("mb-3 text-sm text-ring [--hero-slide-from:.75rem] [--section-enter-delay:.19s] md:mb-4", enter)}>
          Thesis project
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
          <div>
            <dt className="text-xs text-ring">Duck test accuracy</dt>
            <dd className="mt-1 text-sm font-medium tabular-nums">{duckTestAccuracy}</dd>
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
