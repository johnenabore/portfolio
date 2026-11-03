import { Badge } from "@/components/ui/badge";
import { heroContent, heroNavigation } from "./hero-content";
import { HeroMenu } from "./hero-menu";

export function HeroHeader() {
  return (
    <header className="absolute inset-x-[4.7%] top-[3.7%] z-2 flex items-center justify-between gap-4 text-hero-ui [--hero-slide-from:-1.25rem] motion-safe:animate-hero-header compact:relative compact:inset-auto compact:flex-wrap">
      <Badge
        variant="outline"
        className="shrink gap-[.55em] rounded-[999px] px-[.72em] py-[.52em] text-[length:inherit] leading-[inherit] font-normal shadow-[0_1rem_2rem_#00000013,0_.2rem_.5rem_#00000009]"
      >
        <span className="aspect-square w-[.72em] rounded-[50%] bg-[#21be65]" aria-hidden="true" />
        {heroContent.availability}
      </Badge>
      <nav
        className="flex flex-1 justify-evenly gap-3 compact:order-1 compact:basis-full compact:justify-between"
        aria-label="Portfolio"
      >
        {heroNavigation.map(({ label, count, href }) => {
          const content = (
            <>
              {label}
              {count && <small className="ms-[.6em] text-[#696969]">[{count}]</small>}
            </>
          );

          return href ? (
            <a key={label} className="whitespace-nowrap hover:underline underline-offset-4" href={href}>{content}</a>
          ) : (
            <button key={label} className="whitespace-nowrap" type="button" disabled>{content}</button>
          );
        })}
      </nav>
      <HeroMenu />
    </header>
  );
}
