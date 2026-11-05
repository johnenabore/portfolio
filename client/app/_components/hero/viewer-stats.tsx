"use client";

import { useViewerStats } from "../viewer-provider";

const number = new Intl.NumberFormat("en-US");

export function ViewerStats() {
  const stats = useViewerStats();
  const ready = stats.status === "ready";

  return (
    <section aria-label="Site activity" className="mt-8 border-t border-white/20 pt-5">
      <dl className="grid grid-cols-2 gap-5">
        <div>
          <dt className="flex items-center gap-2 text-[.65rem] font-medium tracking-[.1em] text-white/65 uppercase">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${ready ? "bg-[#b5c7aa]" : "bg-white/30"}`} />
            Active viewers
          </dt>
          <dd className="mt-2 text-3xl leading-none font-medium tracking-[-.04em] tabular-nums">
            {ready ? number.format(stats.active) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-[.65rem] font-medium tracking-[.1em] text-white/65 uppercase">Total visits</dt>
          <dd className="mt-2 text-3xl leading-none font-medium tracking-[-.04em] tabular-nums">
            {ready ? number.format(stats.total) : "—"}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs leading-relaxed text-white/55">
        {ready ? "Active in the last 90 seconds · Visits counted per browser session." :
          stats.status === "loading" ? "Checking site activity…" : "Site activity is temporarily unavailable."}
      </p>
    </section>
  );
}
