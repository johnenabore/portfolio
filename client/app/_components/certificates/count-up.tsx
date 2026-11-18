"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "@/lib/motion";

// Counts from 0 to `value` the first time it scrolls into view. The final number is rendered on the server.
export function CountUp({ value, pad = 2 }: { value: number; pad?: number }) {
  const element = useRef<HTMLSpanElement>(null);
  const format = (number: number) => String(number).padStart(pad, "0");

  useEffect(() => {
    const node = element.current;
    if (!node || !motionAllowed() || !("IntersectionObserver" in window)) return;

    let frame = 0;
    node.textContent = format(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        node.textContent = format(Math.round((1 - (1 - progress) ** 3) * value));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pad]);

  return <span ref={element} className="tabular-nums">{format(value)}</span>;
}
