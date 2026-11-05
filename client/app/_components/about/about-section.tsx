import { sectionFont } from "@/app/fonts";
import { aboutContent } from "@/data/about";
import { cn } from "@/lib/utils";
import { SectionReveal } from "../section-reveal";
import { NowPlaying } from "./now-playing";

const reveal = "site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal";

export function AboutSection() {
  return (
    <SectionReveal
      id="about"
      className={cn("min-h-svh snap-start snap-always border-t border-border bg-background", sectionFont.className)}
    >
      <div className="mx-auto grid w-[90.6%] max-w-[90rem] items-start gap-x-[9%] gap-y-14 pt-[clamp(3rem,6vw,6rem)] pb-[clamp(4rem,7vw,7rem)] md:grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <header className="overflow-hidden pb-2">
            <h2 id="about-title" className={cn("text-[clamp(3.2rem,7.4vw,7.75rem)] leading-[.95] font-semibold tracking-[-.075em] uppercase [--hero-slide-from:100%]", reveal)}>
              About me
            </h2>
          </header>

          <p className={cn("mt-5 max-w-[37ch] text-[clamp(1.15rem,1.85vw,1.65rem)] leading-[1.45] font-medium tracking-[-.025em] [--section-enter-delay:.16s] sm:mt-8", reveal)}>
            {aboutContent.bio}
          </p>
          <p className={cn("mt-4 text-xs font-medium tracking-[.12em] text-ring uppercase [--section-enter-delay:.31s]", reveal)}>
            {aboutContent.education}
          </p>

          <div className="mt-9 sm:mt-12">
            <h3 className={cn("border-t border-border pt-5 text-xs font-semibold tracking-[.16em] uppercase [--section-enter-delay:.46s]", reveal)}>
              Tech stack
            </h3>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-7">
              {aboutContent.stack.map(({ category, tools }, index) => (
                <div key={category} className={cn("min-w-0", reveal)} style={{ animationDelay: `${560 + index * 70}ms` }}>
                  <dt className="mb-1.5 text-xs text-ring">{category}</dt>
                  <dd className="text-sm leading-relaxed font-medium">{tools.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className={cn("min-w-0 md:mt-[clamp(1.75rem,4vw,4rem)] [--section-enter-delay:1.02s] [--hero-slide-from:1.75rem]", reveal)}>
          <NowPlaying />
        </div>
      </div>
    </SectionReveal>
  );
}
