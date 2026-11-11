"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ProjectPlaceholder } from "../projects/project-placeholder";

export function ServiceList() {
  const listId = useId();
  const [active, setActive] = useState<string | null>(null);

  return (
    <ul
      data-expanded={active !== null ? "" : undefined}
      className="mt-[clamp(3rem,8svh,4.5rem)] list-none p-0 [--service-detail:4.5rem] [--services-gap:clamp(5.5rem,17svh,10rem)] site-motion:transition-[margin-top] site-motion:duration-500 site-motion:ease-hero-intro md:mt-(--services-gap) md:data-expanded:mt-[calc(var(--services-gap)-var(--service-detail))]"
    >
      {services.map((service, index) => {
        const expanded = active === service.id;
        const titleId = `${listId}-${service.id}`;
        const detailId = `${titleId}-detail`;

        return (
          <li
            key={service.id}
            className="site-motion:group-data-[reveal=waiting]/reveal:opacity-0 site-motion:group-data-[reveal=visible]/reveal:animate-service-row"
            style={{ "--service-row-delay": `${300 + index * 145}ms` } as CSSProperties}
          >
            <Button
              type="button"
              variant="ghost"
              data-expanded={expanded ? "" : undefined}
              aria-expanded={expanded}
              aria-labelledby={titleId}
              aria-controls={detailId}
              aria-describedby={expanded ? detailId : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(service.id);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") {
                  setActive((current) => current === service.id ? null : current);
                }
              }}
              onClick={(event) => {
                const input = event.nativeEvent;
                const mouse = input instanceof PointerEvent
                  ? input.pointerType === "mouse"
                  : window.matchMedia("(hover: hover) and (pointer: fine)").matches;
                if (event.detail > 0 && mouse) return;
                setActive((current) => current === service.id ? null : service.id);
              }}
              className="group/service relative grid h-auto w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-none border-b border-[#d4d4d4] bg-transparent px-[clamp(.75rem,1.85vw,1.75rem)] py-[clamp(1.45rem,5.2svh,3.5rem)] text-left whitespace-normal text-foreground transition-none not-disabled:hover:bg-black/[.035] site-motion:transition-[background-color,color,border-radius] site-motion:duration-500 site-motion:ease-hero-intro data-expanded:rounded-[.4rem] data-expanded:border-transparent data-expanded:bg-primary data-expanded:text-primary-foreground not-disabled:data-expanded:hover:bg-primary not-disabled:data-expanded:hover:text-primary-foreground"
            >
              <span className="min-w-0">
                <span id={titleId} className="block text-[clamp(1.45rem,4.65vw,4.25rem)] leading-[1.02] font-normal tracking-[-.055em] uppercase group-focus-visible/service:underline group-focus-visible/service:underline-offset-8">
                  {service.title}
                </span>
                <span
                  id={detailId}
                  aria-hidden={!expanded}
                  className="grid grid-rows-[0fr] opacity-0 site-motion:transition-[grid-template-rows,opacity] site-motion:duration-500 site-motion:ease-hero-intro group-data-expanded/service:grid-rows-[1fr] group-data-expanded/service:opacity-100"
                >
                  <span className="min-h-0 overflow-hidden">
                    <span className="block max-w-[36ch] pt-3 text-sm leading-relaxed font-normal text-white/75 sm:text-base md:h-(--service-detail)">
                      {service.description}
                    </span>
                    <span aria-hidden="true" className="pointer-events-none relative mt-5 mb-2 ms-3 block aspect-[4/3] w-[62%] translate-y-2 rotate-3 overflow-hidden bg-white shadow-[0_12px_36px_#0003] site-motion:transition-[translate,rotate] site-motion:duration-500 site-motion:ease-hero-intro group-data-expanded/service:translate-y-0 group-data-expanded/service:rotate-8 md:absolute md:top-[-17%] md:left-[75%] md:mt-0 md:mb-0 md:ms-0 md:w-[17.5%]">
                      {"image" in service ? (
                        <Image src={service.image} alt="" fill sizes="(min-width: 768px) 24vw, 55vw" className="object-cover" />
                      ) : (
                        <ProjectPlaceholder artwork={service.artwork} />
                      )}
                    </span>
                  </span>
                </span>
              </span>
              <span aria-hidden="true" className="grid size-[clamp(1.65rem,3vw,2.6rem)] place-items-center text-[clamp(1.5rem,3vw,2.75rem)] leading-none font-light">
                <span className="col-start-1 row-start-1 site-motion:transition-[opacity,rotate] site-motion:duration-300 group-data-expanded/service:rotate-45 group-data-expanded/service:opacity-0">↗</span>
                <span className="col-start-1 row-start-1 -rotate-45 opacity-0 site-motion:transition-[opacity,rotate] site-motion:duration-300 group-data-expanded/service:rotate-0 group-data-expanded/service:opacity-100">×</span>
              </span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
