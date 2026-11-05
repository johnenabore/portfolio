import { HeroHeader } from "./hero-header";
import { HeroIntro } from "./hero-intro";
import { HeroPortrait } from "./hero-portrait";
import { HeroSocials } from "./hero-socials";
import { HeroTitle } from "./hero-title";

export function Hero() {
  return (
    <section
      id="home"
      data-scroll-section
      tabIndex={-1}
      className="relative isolate min-h-[max(38rem,97.5svh)] snap-start snap-always overflow-hidden bg-background [--hero-ui-size:clamp(.75rem,1.23vw,1.125rem)] compact:min-h-[97.5svh] compact:px-[5%] compact:pt-[1.35rem] compact:pb-8 compact:[--hero-ui-size:clamp(.72rem,2.6vw,.95rem)]"
      aria-labelledby="hero-title"
    >
      <HeroHeader />
      <HeroTitle />
      <HeroPortrait />
      <HeroIntro />
      <HeroSocials />
    </section>
  );
}
