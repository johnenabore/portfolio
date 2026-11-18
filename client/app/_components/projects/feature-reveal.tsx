"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Reveals one featured project when it scrolls into view, like SectionReveal does for a section.
export function FeatureReveal({ children }: { children: ReactNode }) {
  const block = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = block.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (element.dataset.showcase === "waiting") element.dataset.showcase = "visible";
      observer.disconnect();
    }, { rootMargin: "0px 0px -42% 0px" });

    element.dataset.showcase = "waiting";
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.showcase;
    };
  }, []);

  return (
    <div
      ref={block}
      className="group/showcase"
      onFocusCapture={(event) => {
        event.currentTarget.dataset.showcase = "done";
      }}
    >
      {children}
    </div>
  );
}
