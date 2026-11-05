"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClipCover, type ClipCoverDetails } from "./clip-cover";

type Screenshot = {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  cover?: ClipCoverDetails;
  video?: { src: string; width: number; height: number };
};

const positions = {
  center: "z-20 -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100",
  left: "z-10 translate-x-[-121%] -translate-y-1/2 -rotate-12 scale-[.91]",
  right: "z-10 translate-x-[21%] -translate-y-1/2 rotate-12 scale-[.91]",
  hidden: "invisible -translate-x-1/2 -translate-y-1/2 scale-[.82] opacity-0",
};

const tones = [
  "bg-[radial-gradient(ellipse_at_48%_32%,#88a991,#41614f_52%,#1e3028)]",
  "bg-[radial-gradient(ellipse_at_50%_28%,#b0b88b,#687c52_52%,#303c2a)]",
  "bg-[radial-gradient(ellipse_at_52%_28%,#8ca3a0,#45666a_52%,#203438)]",
];

function ScreenshotMedia({ shot, index, expanded = false }: { shot: Screenshot; index: number; expanded?: boolean }) {
  if (shot.image) {
    return <Image src={shot.image.src} alt={expanded ? shot.image.alt : ""} fill sizes={expanded ? "90vw" : "(max-width: 640px) 33vw, 240px"} className={expanded && !shot.video ? "object-contain" : "object-cover"} />;
  }

  return (
    <div className={cn("absolute inset-0 grid place-items-center text-[#edf4e8]", tones[index % tones.length])}>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(#ffffff13_1px,transparent_1px),linear-gradient(90deg,#ffffff13_1px,transparent_1px)] bg-size-[1.1rem_1.1rem]" />
      <svg aria-hidden="true" viewBox="0 0 80 80" className="relative w-[41%] max-w-32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="66" height="66" rx="12" fill="#14221d" fillOpacity=".25" strokeOpacity=".5" />
        {index % 3 === 0 && <path d="M23 34a24 24 0 0 1 34 0m-28 7a16 16 0 0 1 22 0m-16 7a7 7 0 0 1 10 0m-5 7v.5" strokeWidth="2" />}
        {index % 3 === 1 && <path d="M40 21c-9 0-17 14-17 25a17 17 0 0 0 34 0c0-11-8-25-17-25ZM15 40h50" />}
        {index % 3 === 2 && <path d="M26 27h28v27H26zM32 40l5 5 10-11m-15 25h16" />}
      </svg>
    </div>
  );
}

const viewerEasing = "cubic-bezier(.22, .7, .26, 1)";

function mediaFrame(element: HTMLElement, stage: DOMRect) {
  const rect = element.getBoundingClientRect();
  const { borderRadius, boxShadow } = getComputedStyle(element);

  return {
    left: `${rect.left + rect.width / 2 - stage.left}px`,
    top: `${rect.top + rect.height / 2 - stage.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius,
    boxShadow,
  };
}

function canAnimateViewer(media: HTMLElement) {
  return typeof media.animate === "function" &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
    !document.documentElement.hasAttribute("data-reduce-motion");
}

function releaseViewerScroll() {
  document.documentElement.style.removeProperty("--screenshot-scrollbar-width");
}

export function ProjectScreenshots({ shots }: { shots: readonly Screenshot[] }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const expandedMedia = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const expandedCover = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId();
  useEffect(() => releaseViewerScroll, []);
  const selected = shots[active];
  if (!selected) return null;

  function expand(trigger: HTMLButtonElement) {
    const viewer = dialog.current;
    const media = expandedMedia.current;
    const frameStage = stage.current;
    if (!viewer || !media || !frameStage || viewer.open) return;

    const root = document.documentElement;
    root.style.setProperty("--screenshot-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
    opener.current = trigger;
    trigger.focus({ preventScroll: true });
    viewer.showModal();

    const video = player.current;
    if (video && selected?.video) {
      video.controls = true;
      video.src = selected.video.src;
      void video.play().catch(() => {});
    }

    media.getAnimations().forEach((animation) => animation.cancel());
    if (!canAnimateViewer(media)) return;

    const bounds = frameStage.getBoundingClientRect();
    trigger.setAttribute("data-viewing", "");
    expandedCover.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      delay: 140,
      duration: 240,
      easing: "ease-out",
      fill: "backwards",
    });
    media.animate([mediaFrame(trigger, bounds), mediaFrame(media, bounds)], {
      duration: 520,
      easing: viewerEasing,
    });
  }

  function closeViewer() {
    const viewer = dialog.current;
    const media = expandedMedia.current;
    const frameStage = stage.current;
    const trigger = opener.current;
    if (!viewer?.open || viewer.hasAttribute("data-closing")) return;
    player.current?.pause();
    const finishClose = () => {
      trigger?.removeAttribute("data-viewing");
      viewer.close();
    };
    if (!media || !frameStage || !trigger?.isConnected || !canAnimateViewer(media)) {
      finishClose();
      return;
    }

    const bounds = frameStage.getBoundingClientRect();
    const from = mediaFrame(media, bounds);
    media.getAnimations().forEach((animation) => animation.cancel());
    const cover = expandedCover.current;
    if (cover) {
      const { opacity } = getComputedStyle(cover);
      cover.getAnimations().forEach((animation) => animation.cancel());
      cover.animate([{ opacity }, { opacity: 1 }], {
        delay: 75,
        duration: 290,
        easing: "ease-out",
        fill: "both",
      });
    }
    if (player.current) player.current.controls = false;
    viewer.setAttribute("data-closing", "");
    const animation = media.animate([from, mediaFrame(trigger, bounds)], {
      duration: 480,
      easing: viewerEasing,
      fill: "forwards",
    });
    void animation.finished.then(finishClose).catch(() => {});
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : -1) + shots.length) % shots.length;
    setActive(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  return (
    <>
      <div
        role="group"
        aria-label="Project media carousel"
        onKeyDown={handleKeys}
        className="relative isolate mx-auto aspect-[1.6] w-full max-w-[43rem] bg-[radial-gradient(#20202019_1px,transparent_1px)] bg-size-[14px_14px]"
      >
        {shots.map((shot, index) => {
          const offset = (index - active + shots.length) % shots.length;
          const position = offset === 0 ? "center" : offset === 1 ? "right" : offset === shots.length - 1 ? "left" : "hidden";
          const centered = position === "center";

          return (
            <button
              key={shot.title}
              ref={(element) => { buttons.current[index] = element; }}
              type="button"
              data-position={position}
              aria-label={`${centered ? (shot.video ? "Play" : "Expand") : "Select"} ${shot.title}`}
              aria-current={centered ? "true" : undefined}
              aria-haspopup={centered ? "dialog" : undefined}
              tabIndex={position === "hidden" ? -1 : undefined}
              onClick={(event) => centered ? expand(event.currentTarget) : setActive(index)}
              className={cn(
                "group/card absolute top-1/2 left-1/2 aspect-[2/3] w-[34%] cursor-pointer overflow-hidden rounded-[clamp(.65rem,2vw,1.2rem)] bg-primary text-left text-white shadow-[0_.6rem_1.5rem_#18211c32] focus-visible:brightness-125 data-viewing:[filter:opacity(0)] site-motion:transition-[translate,rotate,scale,opacity] site-motion:duration-500 site-motion:ease-hero-intro",
                positions[position],
              )}
            >
              {shot.cover && shot.image
                ? <ClipCover cover={shot.cover} src={shot.image.src} index={index} showPlay={centered} />
                : <ScreenshotMedia shot={shot} index={index} />}
              {centered && !shot.cover && (
                <span aria-hidden="true" className={cn(
                  "pointer-events-none absolute inset-0 grid place-items-center group-data-viewing/card:opacity-0 site-motion:transition-[background-color,opacity] site-motion:duration-200",
                  shot.video
                    ? "group-hover/card:bg-black/25 group-focus-visible/card:bg-black/25"
                    : "bg-black/25 opacity-0 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 [@media(hover:none)]:bg-transparent [@media(hover:none)]:opacity-100",
                )}>
                  <span className="grid size-[clamp(2rem,5vw,3.25rem)] place-items-center rounded-full bg-white text-primary shadow-md">
                    <svg viewBox="0 0 24 24" className="size-1/2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {shot.video
                        ? <path d="m9 5 12 7-12 7z" fill="currentColor" stroke="none" />
                        : <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />}
                    </svg>
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="mt-1 flex items-start justify-between gap-x-3 border-t border-border pt-3 text-sm">
        <div>
          <p className="font-medium">{selected.title}</p>
          <p className="mt-1 text-ring">{selected.description}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-ring">{String(active + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</span>
      </div>

      <dialog
        ref={dialog}
        data-screenshot-viewer
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-caption`}
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onClose={(event) => {
          const video = player.current;
          if (video?.hasAttribute("src")) {
            video.removeAttribute("src");
            video.load();
          }
          event.currentTarget.removeAttribute("data-closing");
          expandedMedia.current?.getAnimations().forEach((animation) => animation.cancel());
          expandedCover.current?.getAnimations().forEach((animation) => animation.cancel());
          releaseViewerScroll();
        }}
        className="group/viewer fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-x-hidden overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-white [scrollbar-width:none] backdrop:bg-primary/95 site-motion:backdrop:transition-opacity site-motion:backdrop:duration-[480ms] data-closing:backdrop:opacity-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto grid min-h-full w-[min(92vw,54rem)] content-center py-5">
          <div className="mb-3 flex items-center justify-between gap-3 group-data-closing/viewer:opacity-0 site-motion:transition-opacity site-motion:duration-150">
            <h3 id={titleId} className="text-base font-medium sm:text-lg">{selected.title}</h3>
            <Button type="button" variant="ghost" size="sm" className="min-h-11 px-3 text-white/80 not-disabled:hover:bg-white/10 not-disabled:hover:text-white" onClick={closeViewer}>
              Close <span aria-hidden="true">×</span>
            </Button>
          </div>
          <figure>
            <div ref={stage} className="relative h-[min(62dvh,33rem)]">
              <div
                ref={expandedMedia}
                className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md"
                style={selected.video && {
                  aspectRatio: `${selected.video.width} / ${selected.video.height}`,
                  width: "auto",
                  maxWidth: "100%",
                }}
              >
                <ScreenshotMedia shot={selected} index={active} expanded />
                {selected.video && (
                  <video
                    ref={player}
                    aria-labelledby={titleId}
                    controls
                    playsInline
                    preload="none"
                    poster={selected.image?.src}
                    width={selected.video.width}
                    height={selected.video.height}
                    className={cn(
                      "absolute inset-0 size-full object-cover group-data-closing/viewer:pointer-events-none",
                      !selected.cover && "group-data-closing/viewer:opacity-0 site-motion:transition-opacity site-motion:duration-[240ms] site-motion:group-data-closing/viewer:delay-[120ms]",
                    )}
                  >
                    Your browser does not support embedded video.
                  </video>
                )}
                {selected.cover && selected.image && (
                  <div ref={expandedCover} className="pointer-events-none absolute inset-0 opacity-0">
                    <ClipCover cover={selected.cover} src={selected.image.src} index={active} showPlay />
                  </div>
                )}
              </div>
            </div>
            <figcaption id={`${titleId}-caption`} className="pt-4 group-data-closing/viewer:opacity-0 site-motion:transition-opacity site-motion:duration-150">
              <div className="site-motion:animate-case-details">
                <p className="max-w-[60ch] text-sm leading-relaxed text-white/85 sm:text-base">{selected.description}</p>
                {!selected.image && <p className="mt-1 text-xs text-white/60">Screenshot placeholder</p>}
              </div>
            </figcaption>
          </figure>
        </div>
      </dialog>
    </>
  );
}
