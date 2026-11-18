"use client";

import Image from "next/image";
import { useEffect, useId, useImperativeHandle, useRef, useState, type Ref } from "react";
import { formatIssued, type Certificate } from "@/data/certificates";
import { motionAllowed } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type CertificateViewerHandle = { open: (index: number, origin: HTMLElement) => void };

type Props = {
  certificates: readonly Certificate[];
  ref: Ref<CertificateViewerHandle>;
  // Returns the card that currently shows a certificate, so closing can fly back to it.
  findCard: (id: string) => HTMLElement | null;
};

const easing = "cubic-bezier(.22, .7, .26, 1)";
const pad = (value: number) => String(value).padStart(2, "0");

// Transform that maps `to` onto `from` (FLIP), for animating the frame from a card's position.
function invert(from: DOMRect, to: DOMRect) {
  const x = from.left + from.width / 2 - (to.left + to.width / 2);
  const y = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${x}px, ${y}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

export function CertificateViewer({ certificates, ref, findCard }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const current = certificates[index];

  useImperativeHandle(ref, () => ({
    open(next, origin) {
      const viewer = dialog.current;
      if (!viewer || viewer.open) return;
      opener.current = origin;
      setIndex(next);
      const root = document.documentElement;
      root.style.setProperty("--certificate-scrollbar-width", `${window.innerWidth - root.clientWidth}px`);
      root.setAttribute("data-certificate-open", "");
      viewer.showModal();

      if (!motionAllowed()) return;
      // Wait one frame so the dialog has laid out the newly selected certificate.
      requestAnimationFrame(() => {
        const media = frame.current;
        const source = origin.querySelector("img")?.getBoundingClientRect() ?? origin.getBoundingClientRect();
        if (!media) return;
        media.animate(
          [{ transform: invert(source, media.getBoundingClientRect()), borderRadius: "1.5rem" }, { transform: "none", borderRadius: ".75rem" }],
          { duration: 620, easing },
        );
        details.current?.animate(
          [{ opacity: 0, transform: "translateY(1.25rem)" }, { opacity: 1, transform: "none" }],
          { duration: 480, delay: 180, easing, fill: "backwards" },
        );
      });
    },
  }), []);

  useEffect(() => () => {
    document.documentElement.removeAttribute("data-certificate-open");
    document.documentElement.style.removeProperty("--certificate-scrollbar-width");
  }, []);

  function close() {
    const viewer = dialog.current;
    const media = frame.current;
    if (!viewer?.open || viewer.hasAttribute("data-closing")) return;

    const finish = () => {
      viewer.removeAttribute("data-closing");
      viewer.close();
    };
    const card = current ? findCard(current.id) : null;
    // Return focus to the card being viewed now, which may differ from the one that opened the viewer.
    const button = card?.querySelector("button");
    if (button) opener.current = button;
    const target = card?.querySelector("img")?.getBoundingClientRect();
    const visible = target && target.bottom > 0 && target.top < window.innerHeight;
    if (!media || !motionAllowed() || !visible) {
      finish();
      return;
    }

    viewer.setAttribute("data-closing", "");
    details.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: "forwards" });
    const animation = media.animate(
      [{ transform: "none", borderRadius: ".75rem" }, { transform: invert(target, media.getBoundingClientRect()), borderRadius: "1.5rem" }],
      { duration: 480, easing: "cubic-bezier(.45, 0, .25, 1)", fill: "forwards" },
    );
    void animation.finished.then(finish).catch(finish);
  }

  function step(direction: 1 | -1) {
    const next = (index + direction + certificates.length) % certificates.length;
    setIndex(next);
    if (!motionAllowed()) return;
    requestAnimationFrame(() => {
      frame.current?.animate(
        [{ opacity: 0, transform: `translateX(${direction * 2.5}rem) scale(.97)` }, { opacity: 1, transform: "none" }],
        { duration: 380, easing },
      );
      details.current?.animate(
        [{ opacity: 0, transform: `translateX(${direction * 1.25}rem)` }, { opacity: 1, transform: "none" }],
        { duration: 380, delay: 60, easing, fill: "backwards" },
      );
    });
  }

  if (!current) return null;

  return (
    <dialog
      ref={dialog}
      data-certificate-viewer
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => {
        frame.current?.getAnimations().forEach((animation) => animation.cancel());
        details.current?.getAnimations().forEach((animation) => animation.cancel());
        document.documentElement.removeAttribute("data-certificate-open");
        document.documentElement.style.removeProperty("--certificate-scrollbar-width");
        opener.current?.focus({ preventScroll: true });
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-white [scrollbar-width:none] backdrop:bg-[#0d0d0d]/92 backdrop:backdrop-blur-sm site-motion:backdrop:transition-opacity site-motion:backdrop:duration-[480ms] data-closing:backdrop:opacity-0 [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto grid min-h-full w-[min(92vw,80rem)] content-center gap-x-[5%] gap-y-6 py-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)] lg:items-center">
        <div
          ref={frame}
          className="relative overflow-hidden rounded-xl bg-white p-[clamp(.4rem,1vw,.75rem)] shadow-[0_2rem_5rem_-1rem_#000] will-change-transform"
        >
          <div className="relative aspect-[1800/1391] overflow-hidden rounded-md">
            <Image key={current.id} src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 1024px) 50rem, 92vw" className="object-contain" />
          </div>
        </div>

        <div ref={details} className="min-w-0">
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-3">
            <span className="font-mono text-xs text-white/60 tabular-nums">{pad(index + 1)} / {pad(certificates.length)}</span>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10"
            >
              Close <span aria-hidden="true">×</span>
            </button>
          </div>

          <p className="mt-6 text-xs font-medium tracking-[.16em] text-[#b5c7aa] uppercase">{current.kind}</p>
          <h3 id={titleId} className="mt-2 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.02] font-semibold tracking-[-.045em]">{current.title}</h3>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div className="col-span-2">
              <dt className="text-xs text-white/55">Issued by</dt>
              <dd className="mt-1 font-medium">{current.issuer}</dd>
            </div>
            <div>
              <dt className="text-xs text-white/55">Issued</dt>
              <dd className="mt-1 font-medium tabular-nums">{formatIssued(current.issued)}</dd>
            </div>
            {current.expires && (
              <div>
                <dt className="text-xs text-white/55">Expires</dt>
                <dd className="mt-1 font-medium tabular-nums">{formatIssued(current.expires)}</dd>
              </div>
            )}
            {current.credentialId && (
              <div className="col-span-2">
                <dt className="text-xs text-white/55">Credential ID</dt>
                <dd className="mt-1 font-mono font-medium">{current.credentialId}</dd>
              </div>
            )}
          </dl>

          {current.skills && (
            <ul aria-label="Skills" className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
              {current.skills.map((skill) => (
                <li key={skill} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80">{skill}</li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
              >
                Verify credential <span aria-hidden="true">↗</span>
              </a>
            )}
            <div className="ms-auto flex gap-2">
              {([[-1, "Previous certificate", "M10 3 5 8l5 5"], [1, "Next certificate", "m6 3 5 5-5 5"]] as const).map(([direction, label, path]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => step(direction)}
                  className={cn("grid size-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white focus-visible:border-white")}
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 hidden text-xs text-white/45 fine-pointer:block">Tip: use ← → to browse, Esc to close.</p>
        </div>
      </div>
    </dialog>
  );
}
