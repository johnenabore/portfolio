"use client";

import { useEffect, useRef, type ReactNode } from "react";

type SectionRevealProps = { id: string; className: string; children: ReactNode };

export function SectionReveal({ id, className, children }: SectionRevealProps) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (element.dataset.reveal === "waiting") element.dataset.reveal = "visible";
      observer.disconnect();
    }, { rootMargin: "0px 0px -42% 0px" });

    element.dataset.reveal = "waiting";
    observer.observe(element);
    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <section
      ref={section}
      id={id}
      data-scroll-section
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={`group/reveal ${className}`}
      onFocusCapture={(event) => {
        if (event.target !== event.currentTarget) event.currentTarget.dataset.reveal = "done";
      }}
    >
      {children}
    </section>
  );
}
