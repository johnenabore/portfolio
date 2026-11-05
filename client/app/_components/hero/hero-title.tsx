import { heroContent } from "./hero-content";

export function HeroTitle() {
  const { first, last } = heroContent.name;

  return (
    <h1
      id="hero-title"
      className="absolute inset-x-[4.7%] top-[23.1%] m-0 [--hero-slide-from:-65%] site-motion:animate-hero-title compact:relative compact:inset-auto compact:mt-[clamp(2.75rem,9vw,4.5rem)]"
    >
      <span className="sr-only">{first} {last}</span>
      <svg
        className="block h-[min(11.7vw,19svh)] w-full overflow-visible fill-current text-[172px] font-extrabold uppercase compact:h-auto"
        aria-hidden="true"
        viewBox="0 0 1180 152"
        preserveAspectRatio="none"
      >
        <text className="[word-spacing:12px]" x="5" y="130" textLength="1170" lengthAdjust="spacingAndGlyphs">
          <tspan className="fill-none stroke-current stroke-[3.5px]">{first}</tspan>
          {" "}
          <tspan>{last}</tspan>
        </text>
      </svg>
    </h1>
  );
}
