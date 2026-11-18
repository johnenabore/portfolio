"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// A thin bar across the top of case studies that fills as the reader scrolls.
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const caseStudy = pathname.startsWith("/projects/");

  useEffect(() => {
    if (!caseStudy) return;
    let frame = 0;

    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [caseStudy, pathname]);

  if (!caseStudy) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-[#3a6245]" />
    </div>
  );
}
