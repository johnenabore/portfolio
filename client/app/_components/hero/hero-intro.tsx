import { portfolioLinks } from "@/data/portfolio-links";
import { heroContent } from "./hero-content";
import { HeroCta } from "./hero-cta";

export function HeroIntro() {
  return (
    <div className="absolute top-[66.5%] left-[7.6%] z-2 w-[24%] text-hero-ui compact:relative compact:inset-auto compact:mt-[1.4rem] compact:w-[min(100%,20rem)]">
      <div className="overflow-hidden">
        <h2 className="m-0 text-[clamp(1.4rem,2.6vw,2.5rem)] leading-[1.2] font-semibold tracking-[-.025em] motion-safe:animate-hero-role">
          {heroContent.role}
        </h2>
      </div>
      <div className="overflow-hidden">
        <p className="mt-[.95em] leading-[1.4] text-[#484848] motion-safe:animate-hero-description">
          {heroContent.introduction}
        </p>
      </div>
      <div className="mt-[1.5em] flex w-max max-w-[90vw] flex-wrap gap-2 motion-safe:animate-hero-cta">
        <HeroCta label={heroContent.collaborateLabel} href={portfolioLinks.collaborate} />
        <HeroCta label="Resume" href={portfolioLinks.resume} variant="outline" />
      </div>
    </div>
  );
}
