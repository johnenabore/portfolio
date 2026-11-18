"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { aboutContent } from "@/data/about";
import { motionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ProjectLink } from "../projects/project-transition";

const stops = aboutContent.journey;
const current = Math.max(0, stops.findIndex(({ status }) => status === "current"));
// Timing of the "journey": the line draws one segment per step, and the train rides along with it.
const start = 200;
const step = 600;
const arrive = start + current * step;
const at = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

// The Journey as a transit line: stops are stations, a train rides to where I am now.
export function Journey() {
  const map = useRef<HTMLOListElement>(null);
  const train = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = map.current;
    const car = train.current;
    if (!list || !car) return;

    // Park the train on a stop, measured from the real dot positions so it works in both layouts.
    function place(index: number, animate: boolean) {
      const dots = list!.querySelectorAll<HTMLElement>("[data-stop-dot]");
      const dot = dots[index];
      if (!dot) return;
      const box = list!.getBoundingClientRect();
      const rect = dot.getBoundingClientRect();
      const vertical = getComputedStyle(list!).getPropertyValue("--journey-vertical").trim() === "1";
      const x = rect.left + rect.width / 2 - box.left;
      const y = rect.top + rect.height / 2 - box.top;
      car!.style.transition = animate ? `transform ${current * step}ms linear ${start}ms` : "none";
      car!.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${vertical ? 90 : 0}deg)`;
    }

    const drawn = () => "drawn" in list.dataset;
    const motion = motionAllowed() && "IntersectionObserver" in window;
    place(motion ? 0 : current, false);
    if (!motion) list.dataset.drawn = "";

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      list.dataset.drawn = "";
      // Let the start position paint, then ride to the current stop.
      requestAnimationFrame(() => requestAnimationFrame(() => place(current, true)));
    }, { threshold: 0.35 });
    if (motion) observer.observe(list);

    const resize = new ResizeObserver(() => place(drawn() ? current : 0, false));
    resize.observe(list);
    return () => {
      observer.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <section aria-labelledby="journey-title" className="@container mt-10 border-t border-border pt-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="journey-title" className="text-xs font-semibold tracking-[.16em] uppercase">Journey</h3>
        <p className="flex items-center gap-2 text-xs text-ring">
          <span aria-hidden="true" className="grid size-6 place-items-center rounded-md bg-foreground text-[.6rem] font-bold tracking-tight text-background">CS</span>
          Line BSCS · {stops.length} stops
        </p>
      </header>

      <ol
        ref={map}
        className="group/journey relative mt-7 list-none p-0 [--journey-vertical:1] @[30rem]:grid @[30rem]:[--journey-vertical:0]"
        style={{ gridTemplateColumns: `repeat(${stops.length}, minmax(0, 1fr))` }}
      >
        {stops.map(({ year, title, detail, href, status }, index) => {
          const reached = index * step + start;
          const isCurrent = status === "current";
          const isNext = status === "next";
          const travelled = index < current;
          const last = index === stops.length - 1;

          return (
            <li
              key={title}
              aria-current={isCurrent ? "step" : undefined}
              className="group/stop relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 pb-7 last:pb-0 @[30rem]:block @[30rem]:pb-0 @[30rem]:text-center"
            >
              {/* Rail segment to the next stop: solid where I've been, dashed where I'm heading. */}
              {!last && (
                <span aria-hidden="true" className="pointer-events-none absolute top-3 bottom-[-.75rem] left-3 w-0.5 -translate-x-1/2 @[30rem]:top-3 @[30rem]:bottom-auto @[30rem]:left-1/2 @[30rem]:h-0.5 @[30rem]:w-full @[30rem]:translate-x-0 @[30rem]:-translate-y-1/2">
                  <span className="absolute inset-0 rounded-full bg-border" />
                  {travelled ? (
                    <span
                      className="absolute inset-0 origin-top rounded-full bg-foreground @[30rem]:origin-left site-motion:scale-y-0 site-motion:transition-transform site-motion:duration-[600ms] site-motion:ease-linear @[30rem]:site-motion:scale-x-0 @[30rem]:site-motion:scale-y-100 site-motion:group-data-drawn/journey:scale-y-100 @[30rem]:site-motion:group-data-drawn/journey:scale-x-100"
                      style={at(reached)}
                    />
                  ) : (
                    <span
                      className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,var(--foreground)_0_5px,transparent_5px_10px)] opacity-60 @[30rem]:bg-[repeating-linear-gradient(to_right,var(--foreground)_0_5px,transparent_5px_10px)] site-motion:opacity-0 site-motion:transition-opacity site-motion:duration-500 site-motion:group-data-drawn/journey:opacity-60"
                      style={at(arrive + 200)}
                    />
                  )}
                </span>
              )}

              {/* Station marker. The current stop is marked by the train itself, with a live halo. */}
              <span className="relative z-1 flex h-6 items-center justify-center">
                <span
                  data-stop-dot
                  aria-hidden="true"
                  className={cn(
                    "block size-3.5 rounded-full border-2 border-foreground site-motion:transition-[scale,background-color,opacity] site-motion:duration-300 site-motion:ease-out",
                    status === "done" && "bg-foreground shadow-[0_0_0_3px_var(--background)] site-motion:scale-50 site-motion:bg-background site-motion:group-data-drawn/journey:scale-100 site-motion:group-data-drawn/journey:bg-foreground",
                    isCurrent && "size-4 bg-background shadow-[0_0_0_3px_var(--background)]",
                    isNext && "border-dashed bg-background site-motion:opacity-0 site-motion:group-data-drawn/journey:opacity-100",
                    href && "group-has-[a:hover]/stop:scale-125",
                  )}
                  style={at(isNext ? arrive + 300 : reached)}
                />
                {isCurrent && (
                  <span aria-hidden="true" className="absolute size-7 rounded-full site-motion:group-data-drawn/journey:animate-live-pulse" style={{ animationDelay: `${arrive}ms` }} />
                )}
              </span>

              <div
                className="min-w-0 site-motion:translate-y-2 site-motion:opacity-0 site-motion:transition-[opacity,translate] site-motion:duration-500 site-motion:ease-hero-intro site-motion:group-data-drawn/journey:translate-y-0 site-motion:group-data-drawn/journey:opacity-100 @[30rem]:mt-3 @[30rem]:px-1.5"
                style={at((isNext ? arrive + 300 : reached) + 120)}
              >
                <p className={cn("font-mono text-[.68rem] tabular-nums", isNext ? "text-ring" : "text-foreground/70")}>{year}</p>
                <p className="mt-1 text-sm leading-snug font-semibold tracking-[-.015em]">
                  {href ? (
                    <ProjectLink href={href} projectTitle={title} className="underline-offset-4 hover:underline focus-visible:underline">
                      {title} <span aria-hidden="true">↗</span>
                    </ProjectLink>
                  ) : title}
                  {isCurrent && <span className="sr-only"> (current stop)</span>}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-ring">{detail}</p>
                {isCurrent && (
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1 text-[.62rem] font-semibold tracking-[.12em] text-background uppercase site-motion:-translate-y-1 site-motion:scale-90 site-motion:opacity-0 site-motion:transition-[opacity,translate,scale] site-motion:duration-500 site-motion:ease-hero-intro site-motion:group-data-drawn/journey:translate-y-0 site-motion:group-data-drawn/journey:scale-100 site-motion:group-data-drawn/journey:opacity-100"
                    style={at(arrive + 250)}
                  >
                    <span className="size-1.5 rounded-full bg-[#21be65]" />
                    You are here
                  </span>
                )}
              </div>
            </li>
          );
        })}

        {/* The train: rides from the first stop to the current one, then idles with a gentle bob. */}
        <span ref={train} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-2">
          <span
            className="flex h-3.5 w-7 items-center justify-center gap-[3px] rounded-[5px] bg-foreground shadow-[0_2px_6px_#0003,0_0_0_2.5px_var(--background)] site-motion:group-data-drawn/journey:animate-train-bob"
            style={{ animationDelay: `${arrive + 200}ms` }}
          >
            <span className="size-[5px] rounded-[1.5px] bg-background" />
            <span className="size-[5px] rounded-[1.5px] bg-background" />
            <span className="size-[3px] rounded-full bg-[#ffd36a]" />
          </span>
        </span>
      </ol>
    </section>
  );
}
