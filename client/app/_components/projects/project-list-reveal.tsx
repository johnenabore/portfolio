"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProjectListReveal({ children }: { children: ReactNode }) {
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = list.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const items = container.querySelectorAll<HTMLElement>("[data-project-row]");
    const show = (item: HTMLElement) => {
      item.dataset.projectRow = "visible";
      observer.unobserve(item);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const item = entry.target as HTMLElement;
        if (entry.isIntersecting && item.dataset.projectRow === "waiting") show(item);
      }
    }, { rootMargin: "0px 0px -5% 0px" });

    for (const item of items) {
      item.dataset.projectRow = "waiting";
      observer.observe(item);
    }

    function revealFocused(event: FocusEvent) {
      const item = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-project-row]')
        : null;
      if (!item || item.dataset.projectRow === "done") return;
      item.dataset.projectRow = "done";
      observer.unobserve(item);
    }

    container.addEventListener("focusin", revealFocused);
    return () => {
      container.removeEventListener("focusin", revealFocused);
      observer.disconnect();
      for (const item of items) item.setAttribute("data-project-row", "");
    };
  }, []);

  return <div ref={list}>{children}</div>;
}
