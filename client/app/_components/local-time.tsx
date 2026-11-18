"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" });

function subscribe(update: () => void) {
  const interval = window.setInterval(update, 15_000);
  return () => window.clearInterval(interval);
}

type LocalTimeProps = { className?: string; before?: string; after?: string };

// Local time in Laguna, rendered only in the browser so it never mismatches the server HTML.
export function LocalTime({ className, before, after }: LocalTimeProps) {
  const time = useSyncExternalStore(subscribe, () => format.format(Date.now()), () => null);
  if (!time) return null;
  return (
    <span className={className}>
      {before}<time className="tabular-nums">{time}</time>{after}
    </span>
  );
}
