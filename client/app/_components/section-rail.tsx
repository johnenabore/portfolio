"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export function SectionRail() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const targets = sections.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    const desktop = window.matchMedia("(min-width: 1120px) and (hover: hover) and (pointer: fine)");
    let frame = 0;
    let current = "home";

    function update() {
      frame = 0;
      const center = document.documentElement.clientHeight / 2;
      const next = targets.findLast((section) => section.getBoundingClientRect().top <= center)?.id ?? "home";
      if (next === current) return;
      current = next;
      setActive(next);
    }

    function schedule() {
      if (desktop.matches && !frame) frame = window.requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  const dark = active === "contact";

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 right-1 z-10 hidden -translate-y-1/2 min-[1120px]:fine-pointer:block xl:right-2"
    >
      <ol className="grid list-none p-0">
        {sections.map(({ id, label }) => {
          const selected = active === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={selected ? "location" : undefined}
                className={cn("group/marker relative grid size-11 place-items-center rounded-full", dark ? "text-white" : "text-foreground")}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 rounded-full bg-current site-motion:transition-[width,opacity] site-motion:duration-200",
                    selected ? "w-5 opacity-100" : "w-2.5 opacity-50 group-hover/marker:opacity-100 group-focus-visible/marker:opacity-100",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute top-1/2 right-full -translate-y-1/2 rounded-full border px-2.5 py-1 text-[.65rem] font-semibold tracking-[.12em] whitespace-nowrap uppercase site-motion:transition-[translate,opacity] site-motion:duration-200",
                    dark ? "border-white/25 bg-primary" : "border-border bg-background",
                    selected ? "opacity-100" : "translate-x-1 opacity-0 group-hover/marker:translate-x-0 group-hover/marker:opacity-100 group-focus-visible/marker:translate-x-0 group-focus-visible/marker:opacity-100",
                  )}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
