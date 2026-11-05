"use client";

import { useEffect } from "react";
import { playUiSound } from "@/lib/ui-sounds";

export function UiClickSound() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!event.isTrusted) return;

      const projectLink = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[data-project-transition-link]")
        : null;
      const sameTab = projectLink && (!projectLink.target || projectLink.target === "_self") &&
        event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
      // ProjectLink plays the appropriate sound for its own navigation.
      if (!sameTab) playUiSound("click");
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
