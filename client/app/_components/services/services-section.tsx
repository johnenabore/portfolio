import { sectionFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { SectionReveal } from "../section-reveal";
import { ServiceList } from "./service-list";

export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      className={cn("min-h-svh snap-start snap-always overflow-clip bg-accent text-foreground", sectionFont.className)}
    >
      <div className="mx-auto w-[90.6%] max-w-[90rem] pt-[clamp(1.25rem,2.7svh,2.5rem)] pb-[clamp(2.5rem,5svh,4rem)]">
        <header className="relative pt-[clamp(2.75rem,7svh,5.25rem)] [--hero-slide-from:1rem] site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-section-reveal">
          <span aria-hidden="true" className="pointer-events-none absolute top-0 left-0 text-[clamp(3.15rem,10vw,10rem)] leading-none font-bold tracking-[.12em] whitespace-nowrap text-[#ededed]">
            SERVICE
          </span>
          <h2 id="services-title" className="relative text-[clamp(2rem,3.65vw,3.5rem)] leading-none font-[520] tracking-[-.025em] uppercase">
            /Service
          </h2>
        </header>
        <ServiceList />
      </div>
    </SectionReveal>
  );
}
