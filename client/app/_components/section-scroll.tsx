"use client";

import { useEffect } from "react";

const edgeTolerance = 2;
const transitionHold = 650;

export function SectionScroll() {
  useEffect(() => {
    const projects = document.getElementById("projects");
    if (!projects) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let holdUntil = 0;

    const handleWheel = (event: WheelEvent) => {
      if (
        !motion.matches ||
        event.defaultPrevented ||
        !event.cancelable ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        (event.target instanceof Element && event.target.closest('[role="dialog"], dialog[open]'))
      ) return;

      const now = performance.now();
      if (now < holdUntil) {
        event.preventDefault();
        return;
      }

      const scrollY = window.scrollY;
      const projectsTop = projects.getBoundingClientRect().top + scrollY;
      const heroEnd = Math.max(0, projectsTop - window.innerHeight);
      const atHeroEnd = scrollY >= heroEnd - edgeTolerance && scrollY < projectsTop - edgeTolerance;
      const atProjectsStart = Math.abs(scrollY - projectsTop) <= edgeTolerance;
      const forward = event.deltaY > 0;

      if (forward ? !atHeroEnd : !atProjectsStart) return;

      event.preventDefault();
      holdUntil = now + transitionHold;
      window.scrollTo({ top: forward ? projectsTop : heroEnd, behavior: "smooth" });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return null;
}
