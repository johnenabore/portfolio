"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { heroContent } from "./hero-content";

const portraitSizes = "(max-width: 840px) 90vw, 59vw";

function moveReveal(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;

  const portrait = event.currentTarget;
  const bounds = portrait.getBoundingClientRect();
  portrait.style.setProperty("--reveal-x", `${event.clientX - bounds.left}px`);
  portrait.style.setProperty("--reveal-y", `${event.clientY - bounds.top}px`);
  portrait.dataset.revealActive = "";
}

function hideReveal(event: PointerEvent<HTMLElement>) {
  delete event.currentTarget.dataset.revealActive;
}

export function HeroPortrait() {
  const { name, portraitSrc } = heroContent;

  return (
    <figure
      className="group/portrait pointer-events-none absolute bottom-0 left-[51.5%] z-1 m-0 aspect-[4/3] h-[min(65.5%,44vw)] -translate-x-1/2 site-motion:animate-hero-portrait compact:relative compact:inset-auto compact:mx-auto compact:mt-[-2.5%] compact:h-auto compact:w-[min(100%,34rem)] compact:translate-none"
      onPointerEnter={moveReveal}
      onPointerMove={moveReveal}
      onPointerLeave={hideReveal}
      onPointerCancel={hideReveal}
    >
      <Image
        className="grayscale"
        src={portraitSrc}
        alt={`Portrait of ${name.first} ${name.last}`}
        fill
        sizes={portraitSizes}
        loading="eager"
      />
      <div
        className="portrait-reveal-mask absolute inset-0 opacity-0 site-motion:transition-opacity site-motion:duration-250 site-motion:ease-[ease] fine-pointer:group-data-[reveal-active]/portrait:opacity-100"
        aria-hidden="true"
      >
        <Image src={portraitSrc} alt="" fill sizes={portraitSizes} />
      </div>
      <div className="portrait-hit-area absolute inset-0 fine-pointer:pointer-events-auto" />
    </figure>
  );
}
