"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Section = { id: string; label: string };

// "On this page" navigation that highlights the section being read and shows where you are.
export function CaseStudyNav({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<string>();
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const current = sections.find(({ id }) => visible.has(id));
      if (current && !atBottom()) setActive(current.id);
    }, { rootMargin: "-30% 0px -55% 0px" });

    // A short last section never reaches the highlight band, so mark it once the page bottoms out.
    function checkBottom() {
      if (atBottom()) setActive(sections[sections.length - 1].id);
    }

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", checkBottom, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkBottom);
    };
  }, [sections]);

  const index = Math.max(0, sections.findIndex(({ id }) => id === active));

  return (
    <nav aria-label="On this page" className="border-t border-border pt-4 md:sticky md:top-8">
      <p className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[.14em] text-ring uppercase">
        On this page
        <span aria-hidden="true" className="font-mono tracking-normal tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </span>
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm md:grid">
        {sections.map(({ id, label }) => {
          const current = id === active;
          return (
            <li key={id}>
              <a
                className={cn(
                  "group/link inline-flex min-h-9 items-center gap-2 underline-offset-4 hover:underline focus-visible:underline",
                  current ? "font-semibold text-foreground" : "text-ring",
                )}
                aria-current={current ? "location" : undefined}
                href={`#${id}`}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "hidden h-px bg-current md:block site-motion:transition-[width] site-motion:duration-300 site-motion:ease-hero-intro",
                    current ? "w-4" : "w-0",
                  )}
                />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
