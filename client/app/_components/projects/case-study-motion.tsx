"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const element = container.current;
    if (!element || !("IntersectionObserver" in window)) return;

    for (const entry of element.querySelectorAll<HTMLElement>("[data-project-entry]")) {
      for (const animation of entry.getAnimations()) animation.currentTime = 0;
    }

    const root = document.documentElement;
    const blocks = Array.from(element.querySelectorAll<HTMLElement>(
      "article section[id] > :not(ol, dialog, [data-case-group]), article section[id] > ol > li, [data-case-group] > *",
    ));
    const visible = new Set<HTMLElement>();

    function revealVisible() {
      if (root.hasAttribute("data-project-transition")) return;
      let order = 0;
      for (const block of visible) {
        if (block.dataset.caseReveal === "waiting") {
          block.style.setProperty("--case-reveal-delay", `${Math.min(order, 3) * 85}ms`);
          block.dataset.caseReveal = "visible";
          order += 1;
        }
        observer.unobserve(block);
      }
      visible.clear();
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const block = entry.target as HTMLElement;
        if (entry.isIntersecting) visible.add(block);
        else visible.delete(block);
      }
      revealVisible();
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    for (const block of blocks) {
      block.dataset.caseReveal = "waiting";
      observer.observe(block);
    }

    const curtain = new MutationObserver(revealVisible);
    curtain.observe(root, { attributes: true, attributeFilter: ["data-project-transition"] });

    function revealFocused(event: FocusEvent) {
      const block = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-case-reveal="waiting"]')
        : null;
      if (!block || !element?.contains(block)) return;
      block.dataset.caseReveal = "done";
      observer.unobserve(block);
      visible.delete(block);
    }

    element.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      curtain.disconnect();
      element.removeEventListener("focusin", revealFocused);
      for (const block of blocks) {
        delete block.dataset.caseReveal;
        block.style.removeProperty("--case-reveal-delay");
      }
    };
  }, [pathname]);

  return <div ref={container}>{children}</div>;
}
