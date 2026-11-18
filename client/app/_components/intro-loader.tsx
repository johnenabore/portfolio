"use client";

import { useCallback, useEffect, useId, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { sectionFont } from "@/app/fonts";
import { motionAllowed } from "@/lib/motion";
import { introSeenKey } from "@/lib/preferences";
const countDuration = 1100;
const holdDuration = 1500;
const words = ["John", "Enabore"];

// A short branded intro: the name rises in while a counter runs to 100, then the screen wipes up.
export function IntroLoader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const dismiss = useCallback(() => {
    const viewer = dialog.current;
    if (!viewer?.open || viewer.hasAttribute("data-exiting")) return;
    if (timer.current) clearTimeout(timer.current);

    const finish = () => {
      try {
        sessionStorage.setItem(introSeenKey, "true");
      } catch {
        // Browsing remains available when session storage is blocked.
      }
      viewer.close();
      document.documentElement.removeAttribute("data-intro-open");
      document.documentElement.removeAttribute("data-intro-exiting");
      document.getElementById(location.hash.slice(1) || "home")?.focus({ preventScroll: true });
    };

    if (!motionAllowed() || typeof viewer.animate !== "function") {
      finish();
      return;
    }

    viewer.setAttribute("data-exiting", "");
    document.documentElement.setAttribute("data-intro-exiting", "");
    const exit = viewer.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      { duration: 520, easing: "cubic-bezier(.65, 0, .35, 1)", fill: "forwards" },
    );
    void exit.finished.then(finish).catch(() => {});
  }, []);

  useEffect(() => {
    const viewer = dialog.current;
    const root = document.documentElement;
    // The inline head script already decided whether to show the intro (not seen this session,
    // motion allowed) and painted it. Here it becomes a modal dialog and starts counting.
    if (!viewer || !root.hasAttribute("data-intro-open")) return;
    // The intro is purely decorative, so visitors who prefer less motion skip it entirely.
    if (!motionAllowed()) {
      root.removeAttribute("data-intro-open");
      return;
    }
    if (!viewer.open) viewer.showModal();

    const start = performance.now();
    let frame = 0;
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / countDuration);
      const eased = 1 - (1 - progress) ** 3;
      if (counter.current) counter.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    function scheduleDismissal() {
      if (timer.current) clearTimeout(timer.current);
      if (!document.hidden && !viewer?.hasAttribute("data-exiting")) {
        timer.current = setTimeout(dismiss, holdDuration);
      }
    }

    scheduleDismissal();
    document.addEventListener("visibilitychange", scheduleDismissal);
    return () => {
      cancelAnimationFrame(frame);
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", scheduleDismissal);
      viewer.getAnimations().forEach((animation) => animation.cancel());
      root.removeAttribute("data-intro-open");
      root.removeAttribute("data-intro-exiting");
    };
  }, [dismiss]);

  let letterIndex = 0;

  return (
    <dialog
      ref={dialog}
      data-development-intro
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      className={`${sectionFont.className} fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-[#171917] p-0 text-[#f0f1eb] backdrop:bg-[#171917] site-motion:backdrop:transition-opacity site-motion:backdrop:duration-[520ms] data-exiting:backdrop:opacity-0`}
    >
      <div className="mx-auto grid h-full w-[90%] max-w-[90rem] grid-rows-[auto_1fr_auto] py-6 sm:py-8">
        <div className="flex items-center justify-between gap-4 text-xs font-medium tracking-[.16em] text-[#a7ada2] uppercase">
          <span>Portfolio © 2026</span>
          <Button
            variant="ghost"
            onClick={dismiss}
            className="min-h-11 rounded-full px-4 text-xs tracking-[.12em] text-[#f0f1eb] uppercase not-disabled:hover:bg-white/10 not-disabled:hover:text-white"
          >
            Skip
          </Button>
        </div>

        <h2 id={titleId} className="self-center text-[clamp(3.4rem,13vw,13rem)] leading-[.86] font-semibold tracking-[-.075em] uppercase">
          {words.map((word) => (
            <span key={word} className="block overflow-hidden pb-[.04em]">
              {[...word].map((letter) => {
                const index = letterIndex++;
                return (
                  <span
                    key={`${word}-${index}`}
                    className="inline-block site-motion:animate-intro-letter"
                    style={{ "--i": index } as CSSProperties}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <div className="flex items-end justify-between gap-6 border-t border-white/15 pt-4">
          <p className="max-w-[28ch] text-sm leading-relaxed text-[#a7ada2]">Aspiring full stack developer · Laguna, Philippines</p>
          <span aria-hidden="true" className="font-mono text-[clamp(2rem,5vw,4rem)] leading-none tabular-nums text-[#b5c7aa]">
            <span ref={counter}>000</span>
          </span>
        </div>
      </div>
    </dialog>
  );
}
