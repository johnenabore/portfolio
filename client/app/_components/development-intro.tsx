"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { sectionFont } from "@/app/fonts";

const storageKey = "portfolio-development-intro-seen";
const readingTime = 3400;

export function DevelopmentIntro() {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const dismiss = useCallback(() => {
    const viewer = dialog.current;
    if (!viewer?.open || viewer.hasAttribute("data-exiting")) return;
    if (timer.current) clearTimeout(timer.current);

    const finish = () => {
      try {
        sessionStorage.setItem(storageKey, "true");
      } catch {
        // Browsing remains available when session storage is blocked.
      }
      viewer.close();
      document.documentElement.style.removeProperty("--intro-scrollbar-width");
      document.getElementById(location.hash.slice(1) || "home")?.focus({ preventScroll: true });
    };

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
      !document.documentElement.hasAttribute("data-reduce-motion");
    if (!motion || typeof viewer.animate !== "function") {
      finish();
      return;
    }

    viewer.setAttribute("data-exiting", "");
    const exit = viewer.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      { duration: 420, easing: "cubic-bezier(.65, 0, .35, 1)", fill: "forwards" },
    );
    void exit.finished.then(finish).catch(() => {});
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) return;
    } catch {
      // Show the notice for this visit when storage is unavailable.
    }

    const viewer = dialog.current;
    if (!viewer) return;
    const root = document.documentElement;
    root.style.setProperty("--intro-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
    viewer.showModal();

    function scheduleDismissal() {
      if (timer.current) clearTimeout(timer.current);
      if (!document.hidden && !viewer?.hasAttribute("data-exiting")) {
        timer.current = setTimeout(dismiss, readingTime);
      }
    }

    scheduleDismissal();
    document.addEventListener("visibilitychange", scheduleDismissal);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", scheduleDismissal);
      viewer.getAnimations().forEach((animation) => animation.cancel());
      root.style.removeProperty("--intro-scrollbar-width");
    };
  }, [dismiss]);

  return (
    <dialog
      ref={dialog}
      data-development-intro
      aria-labelledby={titleId}
      aria-describedby={`${titleId}-description`}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      className={`${sectionFont.className} fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-[#171917] p-0 text-[#f0f1eb] [scrollbar-width:none] backdrop:bg-[#171917] site-motion:backdrop:transition-opacity site-motion:backdrop:duration-[420ms] data-exiting:backdrop:opacity-0 [&::-webkit-scrollbar]:hidden`}
    >
      <div className="mx-auto grid min-h-full w-[90%] max-w-[76rem] grid-rows-[auto_1fr_auto] gap-8 py-6 sm:py-8">
        <p className="text-xs font-medium tracking-[.16em] uppercase">John Enabore</p>
        <div className="self-center py-3 site-motion:animate-case-details">
          <p className="mb-5 flex items-center gap-2 font-mono text-[.65rem] tracking-[.12em] text-[#b5c7aa] uppercase sm:text-xs">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
            A work in progress
          </p>
          <h2 id={titleId} className="max-w-[13ch] text-[clamp(2.9rem,8vw,7.5rem)] leading-[.98] font-medium tracking-[-.065em]">
            Still in development.
          </h2>
          <p id={`${titleId}-description`} className="mt-6 max-w-[36ch] text-sm leading-relaxed text-[#c2c7be] sm:text-base">
            I’m still building this space. More projects and personal touches are on the way.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-white/15 pt-4">
          <p className="text-xs text-[#a7ada2]">Opening automatically</p>
          <Button
            variant="ghost"
            onClick={dismiss}
            className="min-h-11 rounded-full px-4 text-sm text-[#f0f1eb] not-disabled:hover:bg-white/10 not-disabled:hover:text-white"
          >
            Explore portfolio <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </dialog>
  );
}
