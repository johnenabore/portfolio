import Image from "next/image";
import { smartEggSorter } from "@/data/projects";
import { ProjectLink } from "./project-transition";

export function FeaturedProject() {
  const { title, description, href, image } = smartEggSorter;

  return (
    <article className="group/feature relative grid items-center gap-x-[6%] gap-y-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-[#dedbd6]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1325px) 670px, (min-width: 768px) 52vw, 91vw"
          className="object-cover site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro site-motion:group-hover/feature:scale-[1.025]"
        />
      </div>

      <div className="min-w-0 md:py-4">
        <p className="mb-3 text-sm text-ring md:mb-4">Thesis project</p>
        <h3 className="max-w-[11ch] text-[clamp(2.25rem,5.25vw,4.85rem)] leading-[.98] font-[560] tracking-[-.065em]">
          {title}
        </h3>
        <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-[#484848] sm:text-base">
          {description}
        </p>
        <ProjectLink
          href={href}
          projectTitle={title}
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 after:absolute after:inset-0 md:mt-5"
        >
          Read case study <span aria-hidden="true">↗</span>
        </ProjectLink>
      </div>
    </article>
  );
}
