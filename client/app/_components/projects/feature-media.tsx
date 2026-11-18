"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { finePointer, motionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Featured project image frame: a "View case study" pill follows the mouse over the image,
// and the image drifts slightly with scroll (exposed as --parallax-y).
export function FeatureMedia({ className, children }: { className?: string; children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    let scrollFrame = 0;
    // Only follow scroll while the image is near the screen, and measure it after the browser has laid it out.
    let nearScreen = !("IntersectionObserver" in window);

    function updateParallax() {
      scrollFrame = 0;
      if (!element) return;
      if (!motionAllowed()) {
        element.style.removeProperty("--parallax-y");
        return;
      }
      const bounds = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const offset = (bounds.top + bounds.height / 2 - viewport / 2) / (viewport / 2 + bounds.height / 2);
      element.style.setProperty("--parallax-y", `${(Math.max(-1, Math.min(1, offset)) * -2).toFixed(2)}%`);
    }

    function scheduleParallax() {
      if (nearScreen && !scrollFrame) scrollFrame = requestAnimationFrame(updateParallax);
    }

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          nearScreen = entry.isIntersecting;
          scheduleParallax();
        }, { rootMargin: "25% 0px" })
      : undefined;
    observer?.observe(element);
    scheduleParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
    };
  }, []);

  useEffect(() => {
    const element = frame.current;
    const label = pill.current;
    // The case-study link's overlay covers the image, so listen on the whole featured block.
    const block = element?.closest("article");
    if (!element || !label || !block) return;

    const target = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };
    let loop = 0;

    function place() {
      label!.style.transform = `translate3d(${position.x.toFixed(1)}px, ${position.y.toFixed(1)}px, 0)`;
    }

    function step() {
      position.x += (target.x - position.x) * 0.22;
      position.y += (target.y - position.y) * 0.22;
      place();
      loop = Math.hypot(target.x - position.x, target.y - position.y) > 0.4 ? requestAnimationFrame(step) : 0;
    }

    function hide() {
      delete element!.dataset.pill;
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !finePointer() || !motionAllowed()) return hide();
      const bounds = element!.getBoundingClientRect();
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right &&
        event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (!inside) return hide();

      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      if (!("pill" in element!.dataset)) {
        position.x = target.x;
        position.y = target.y;
        place();
        element!.dataset.pill = "";
      }
      if (!loop) loop = requestAnimationFrame(step);
    }

    block.addEventListener("pointermove", move);
    block.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      cancelAnimationFrame(loop);
      block.removeEventListener("pointermove", move);
      block.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", hide);
    };
  }, []);

  return (
    <div ref={frame} className={cn("group/media relative", className)}>
      {children}
      <span ref={pill} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-10">
        <span className="block -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-primary px-4 py-2 text-xs font-semibold whitespace-nowrap text-primary-foreground opacity-0 shadow-[0_.5rem_1.25rem_#0003] transition-[opacity,scale] duration-300 ease-hero-intro group-data-[pill]/media:scale-100 group-data-[pill]/media:opacity-100">
          View case study ↗
        </span>
      </span>
    </div>
  );
}
