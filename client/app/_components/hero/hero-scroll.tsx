"use client";

import { useEffect } from "react";
import { motionAllowed } from "@/lib/motion";

// Publishes how far the hero has scrolled away as --hero-progress (0 to 1) for scroll-linked styles.
export function HeroScroll() {
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    let frame = 0;

    function update() {
      frame = 0;
      if (!hero || !motionAllowed()) {
        hero?.style.removeProperty("--hero-progress");
        return;
      }
      const { top, height } = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -top / (height * 0.85)));
      hero.style.setProperty("--hero-progress", progress.toFixed(3));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      hero.style.removeProperty("--hero-progress");
    };
  }, []);

  return null;
}
