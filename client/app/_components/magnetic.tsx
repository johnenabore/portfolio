"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motionAllowed } from "@/lib/motion";

const limit = 10;

function pull(event: PointerEvent<HTMLSpanElement>) {
  const target = event.currentTarget;
  if (event.pointerType !== "mouse" || !motionAllowed()) {
    target.style.removeProperty("translate");
    return;
  }

  const bounds = target.getBoundingClientRect();
  const clamp = (value: number) => Math.max(-limit, Math.min(limit, value));
  const x = clamp((event.clientX - (bounds.left + bounds.width / 2)) * 0.3);
  const y = clamp((event.clientY - (bounds.top + bounds.height / 2)) * 0.35);
  target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
}

function release(event: PointerEvent<HTMLSpanElement>) {
  event.currentTarget.style.removeProperty("translate");
}

// Pulls its child gently toward a mouse pointer, then springs back on leave.
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn("inline-flex transition-[translate] duration-300 ease-hero-intro", className)}
      onPointerMove={pull}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      {children}
    </span>
  );
}
