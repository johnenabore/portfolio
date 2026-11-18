import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectLink } from "./project-transition";

// A project as a framed card: rounded artwork on a soft grey mat, title on the left and its kind on the right.
export function ProjectCard({ project, titleLevel: Title = "h2" }: { project: Project; titleLevel?: "h2" | "h3" }) {
  const { title, label, subtitle, href, thumbnail } = project;
  const caption = label ?? subtitle;

  const card = (
    <>
      <div className="rounded-[clamp(1.25rem,2.4vw,1.9rem)] bg-black/[.055] p-[clamp(.4rem,.9vw,.7rem)] site-motion:transition-colors site-motion:duration-500 group-hover/card:bg-black/[.085] group-focus-visible/card:bg-black/[.085]">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[clamp(.9rem,1.8vw,1.4rem)] bg-white">
          {thumbnail ? (
            <Image
              src={thumbnail.src}
              alt=""
              fill
              sizes="(min-width: 1200px) 36rem, (min-width: 640px) 45vw, 91vw"
              className="object-cover site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro site-motion:group-hover/card:scale-[1.035] site-motion:group-focus-visible/card:scale-[1.035]"
            />
          ) : (
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-sm text-ring">Coming soon</div>
          )}
        </div>
      </div>
      <div className="mt-[clamp(.9rem,1.6vw,1.25rem)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-1">
        <Title className="text-[clamp(1.6rem,2.7vw,2.35rem)] leading-none font-[560] tracking-[-.045em] underline-offset-[.15em] decoration-[.05em] group-hover/card:underline group-focus-visible/card:underline">
          {title}
        </Title>
        {caption && <p className="text-sm text-ring sm:text-base">{caption}</p>}
      </div>
    </>
  );

  return href ? (
    <ProjectLink href={href} projectTitle={title} className="group/card block outline-none">
      {card}
    </ProjectLink>
  ) : (
    <div className="group/card">{card}</div>
  );
}
