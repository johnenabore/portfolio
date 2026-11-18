import { Wordmark } from "../wordmark";
import { heroContent } from "./hero-content";

export function HeroTitle() {
  const { first, last } = heroContent.name;

  return (
    <h1
      id="hero-title"
      className="absolute inset-x-[4.7%] top-[23.1%] m-0 [--hero-slide-from:-65%] site-motion:animate-hero-title compact:relative compact:inset-auto compact:mt-[clamp(2.75rem,9vw,4.5rem)]"
    >
      <span className="sr-only">{first} {last}</span>
      {/* "JOHN" starts outlined and fills in as the hero scrolls away (--hero-progress from HeroScroll). */}
      <Wordmark
        className="block h-[min(11.7vw,19svh)] w-full fill-current compact:h-auto"
        firstClassName="fill-current stroke-current stroke-[3.5px] [fill-opacity:var(--hero-progress,0)]"
      />
    </h1>
  );
}
