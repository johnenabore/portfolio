"use client";

import { useViewerStats } from "../viewer-provider";

// Adds the live viewer count to the availability badge once the heartbeat reports it.
export function HeroLive() {
  const stats = useViewerStats();
  if (stats.status !== "ready" || stats.active < 1) return null;

  return (
    <span className="whitespace-nowrap text-[#696969]">
      <span aria-hidden="true">· </span>
      {stats.active} viewing now
    </span>
  );
}
