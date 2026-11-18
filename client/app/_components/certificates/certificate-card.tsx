"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { formatIssued, type Certificate } from "@/data/certificates";
import { finePointer, motionAllowed } from "@/lib/motion";

const maxTilt = 10;

function tilt(event: PointerEvent<HTMLButtonElement>) {
  const card = event.currentTarget;
  if (event.pointerType !== "mouse" || !finePointer() || !motionAllowed()) return;

  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  card.dataset.tilting = "";
  card.style.setProperty("--ry", `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
  card.style.setProperty("--rx", `${((0.5 - y) * 2 * maxTilt).toFixed(2)}deg`);
  card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
  card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
}

function settle(event: PointerEvent<HTMLButtonElement>) {
  const card = event.currentTarget;
  delete card.dataset.tilting;
  for (const property of ["--rx", "--ry", "--mx", "--my"]) card.style.removeProperty(property);
}

// A certificate as a physical card: it tilts toward the mouse and catches a holographic shine.
export function CertificateCard({ certificate, onOpen }: { certificate: Certificate; onOpen: (trigger: HTMLButtonElement) => void }) {
  const { title, issuer, kind, issued, skills, image } = certificate;

  return (
    <div className="[perspective:1000px]">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${title}, ${issuer}. View certificate`}
        onClick={(event) => onOpen(event.currentTarget)}
        onPointerMove={tilt}
        onPointerLeave={settle}
        onPointerCancel={settle}
        className="group/card relative block w-full cursor-pointer rounded-2xl text-left outline-none [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))_translateZ(0)] site-motion:transition-transform site-motion:duration-700 site-motion:ease-hero-intro data-tilting:duration-150 data-tilting:ease-out focus-visible:[--rx:5deg] focus-visible:[--ry:-7deg]"
      >
        <div className="relative overflow-hidden rounded-2xl bg-white p-[clamp(.4rem,1vw,.65rem)] shadow-[0_1.25rem_2.5rem_-1rem_#000c] ring-1 ring-white/10 site-motion:transition-shadow site-motion:duration-500 group-hover/card:shadow-[0_2rem_3.5rem_-1rem_#000e] group-focus-visible/card:ring-2 group-focus-visible/card:ring-[#b5c7aa]">
          <div className="relative aspect-[1800/1391] overflow-hidden rounded-lg bg-[#f4f4f2]">
            <Image
              src={image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 80vw"
              className="object-cover"
            />
          </div>

          {/* Holographic foil: a rainbow sheen that slides with the pointer. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(115deg,transparent_18%,#ff7ac8_32%,#8f7bff_42%,#4fd8ff_52%,#7dffb3_60%,#ffe27a_70%,transparent_84%)] bg-[length:260%_260%] [background-position:var(--mx,50%)_var(--my,50%)] opacity-0 mix-blend-color-dodge site-motion:transition-opacity site-motion:duration-300 group-hover/card:opacity-35 group-focus-visible/card:opacity-25"
          />
          {/* Glare that follows the pointer. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_var(--mx,30%)_var(--my,20%),#ffffffb3,transparent_45%)] opacity-0 mix-blend-soft-light site-motion:transition-opacity site-motion:duration-300 group-hover/card:opacity-100 group-focus-visible/card:opacity-70"
          />
        </div>

        <div className="mt-4 px-1 [transform:translateZ(24px)]">
          <p className="flex flex-wrap items-center gap-x-2 text-[.68rem] font-medium tracking-[.14em] text-white/55 uppercase">
            <span>{issuer}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{formatIssued(issued)}</span>
          </p>
          <h3 className="mt-1.5 text-[clamp(1.05rem,1.45vw,1.3rem)] leading-snug font-semibold tracking-[-.025em] text-white">
            {title}
            <span aria-hidden="true" className="ms-1.5 inline-block text-white/45 site-motion:transition-transform site-motion:duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-white">↗</span>
          </h3>
          <p className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[.68rem] text-white/70">{kind}</span>
            {skills?.map((skill) => (
              <span key={skill} className="rounded-full bg-white/8 px-2 py-0.5 text-[.68rem] text-white/70">{skill}</span>
            ))}
          </p>
        </div>
      </button>
    </div>
  );
}
