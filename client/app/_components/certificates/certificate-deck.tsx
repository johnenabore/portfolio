"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { certificateIssuers, certificates } from "@/data/certificates";
import { motionAllowed } from "@/lib/motion";
import { playUiSound } from "@/lib/ui-sounds";
import { cn } from "@/lib/utils";
import { CertificateCard } from "./certificate-card";
import { CertificateViewer, type CertificateViewerHandle } from "./certificate-viewer";

const all = "All";
const showFilters = certificates.length > 4 && certificateIssuers.length > 1;

// A small seeded wobble so the stacked deck looks hand-placed but renders the same every time.
function wobble(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

export function CertificateDeck() {
  const grid = useRef<HTMLUListElement>(null);
  const cards = useRef(new Map<string, HTMLLIElement>());
  const viewer = useRef<CertificateViewerHandle>(null);
  const before = useRef<Map<string, DOMRect> | null>(null);
  const [filter, setFilter] = useState(all);
  const visible = filter === all ? certificates : certificates.filter(({ issuer }) => issuer === filter);

  // Deal the deck: every card starts stacked near the top of the grid, then flies to its slot.
  useEffect(() => {
    const list = grid.current;
    if (!list || !motionAllowed() || !("IntersectionObserver" in window)) return;

    const items = [...list.children] as HTMLElement[];
    const carousel = window.matchMedia("(max-width: 639px)").matches;
    const hide = items.map((item) => item.animate([{ opacity: 0 }, { opacity: 0 }], { fill: "forwards" }));
    let dealt = false;

    function deal() {
      if (dealt || !list) return;
      dealt = true;
      observer.disconnect();
      hide.forEach((animation) => animation.cancel());

      if (carousel) {
        // On phones the cards sit in a swipeable row, so they simply rise in one after another.
        items.forEach((item, index) => item.animate(
          [{ opacity: 0, transform: "translateY(2rem) rotate(2deg)" }, { opacity: 1, transform: "none" }],
          { duration: 600, delay: index * 70, easing: "cubic-bezier(.22, .7, .26, 1)", fill: "backwards" },
        ));
        return;
      }

      const bounds = list.getBoundingClientRect();
      const first = items[0]?.getBoundingClientRect();
      if (!first) return;
      const deckX = bounds.left + bounds.width / 2;
      const deckY = first.top + first.height / 2;
      playUiSound("projectSweep");

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const x = deckX - (rect.left + rect.width / 2) + wobble(index) * 14;
        const y = deckY - (rect.top + rect.height / 2) + index * -3;
        const rotation = wobble(index + 7) * 9;
        item.style.zIndex = String(items.length - index);
        const animation = item.animate(
          [
            { transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(.9)`, opacity: 1 },
            { transform: `translate(${x * 0.4}px, ${y * 0.4 - 48}px) rotate(${rotation * 0.35}deg) scale(1.04)`, opacity: 1, offset: 0.55 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 780, delay: 260 + index * 95, easing: "cubic-bezier(.2, .75, .25, 1)", fill: "backwards" },
        );
        void animation.finished.then(() => item.style.removeProperty("z-index")).catch(() => {});
      });

      // The whole deck drops in first, before the first card leaves it.
      list.animate(
        [{ opacity: 0, transform: "translateY(1.5rem) scale(.98)" }, { opacity: 1, transform: "none" }],
        { duration: 320, easing: "ease-out" },
      );
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) deal();
    }, { threshold: 0.2, rootMargin: "0px 0px -15% 0px" });
    observer.observe(list);

    // Keyboard users skip the show: focusing inside lays the cards out immediately.
    function skip() {
      if (dealt) return;
      dealt = true;
      observer.disconnect();
      hide.forEach((animation) => animation.cancel());
    }
    list.addEventListener("focusin", skip);

    return () => {
      observer.disconnect();
      list.removeEventListener("focusin", skip);
      items.forEach((item) => {
        item.getAnimations().forEach((animation) => animation.cancel());
        item.style.removeProperty("z-index");
      });
    };
  }, []);

  // Filter changes re-flow the grid with FLIP: cards glide from their old spot to the new one.
  useLayoutEffect(() => {
    const previous = before.current;
    before.current = null;
    if (!previous || !motionAllowed()) return;

    for (const [id, item] of cards.current) {
      const rect = item.getBoundingClientRect();
      const old = previous.get(id);
      if (old) {
        const dx = old.left - rect.left;
        const dy = old.top - rect.top;
        if (dx || dy) item.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 520, easing: "cubic-bezier(.22, .7, .26, 1)" });
      } else {
        item.animate([{ opacity: 0, transform: "scale(.92) translateY(1rem)" }, { opacity: 1, transform: "none" }], { duration: 460, easing: "cubic-bezier(.22, .7, .26, 1)" });
      }
    }
  }, [filter]);

  function choose(next: string) {
    if (next === filter) return;
    before.current = new Map([...cards.current].map(([id, item]) => [id, item.getBoundingClientRect()]));
    setFilter(next);
  }

  const findCard = useCallback((id: string) => cards.current.get(id) ?? null, []);

  return (
    <>
      {showFilters && (
        <div
          role="group"
          aria-label="Filter certificates by issuer"
          className="-mx-[5%] mb-8 flex gap-2 overflow-x-auto px-[5%] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {[all, ...certificateIssuers].map((issuer) => {
            const count = issuer === all ? certificates.length : certificates.filter((item) => item.issuer === issuer).length;
            const pressed = filter === issuer;
            return (
              <button
                key={issuer}
                type="button"
                aria-pressed={pressed}
                onClick={() => choose(issuer)}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap transition-colors",
                  pressed ? "border-white bg-white text-primary" : "border-white/20 text-white/75 hover:border-white/60 hover:text-white",
                )}
              >
                {issuer}
                <span className={cn("font-mono text-[.7rem] tabular-nums", pressed ? "text-primary/60" : "text-white/45")}>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul
        ref={grid}
        className="-mx-[5%] flex snap-x snap-mandatory list-none gap-5 overflow-x-auto px-[5%] pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-[clamp(1.25rem,3vw,2.5rem)] sm:gap-y-[clamp(2rem,4vw,3.25rem)] sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {visible.map((certificate) => (
          <li
            key={certificate.id}
            ref={(element) => {
              if (element) cards.current.set(certificate.id, element);
              else cards.current.delete(certificate.id);
            }}
            className="relative w-[78vw] max-w-[22rem] shrink-0 snap-center sm:w-auto sm:max-w-none"
          >
            <CertificateCard
              certificate={certificate}
              onOpen={(trigger) => viewer.current?.open(certificates.indexOf(certificate), trigger)}
            />
          </li>
        ))}
      </ul>

      <CertificateViewer ref={viewer} certificates={certificates} findCard={findCard} />
    </>
  );
}
