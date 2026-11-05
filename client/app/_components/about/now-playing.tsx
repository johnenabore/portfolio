"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SpotifyPlayback } from "@/lib/spotify/playback";
import { VinylRecord } from "./vinyl-record";

const playbackLabels = {
  idle: "Nothing playing right now.",
  disconnected: "Spotify isn’t connected yet.",
  unavailable: "Playback status is temporarily unavailable.",
};

export function NowPlaying() {
  const card = useRef<HTMLElement>(null);
  const [playback, setPlayback] = useState<SpotifyPlayback>();
  const track = playback?.status === "playing" ? playback.track : undefined;
  const message = playback && playback.status !== "playing"
    ? playbackLabels[playback.status]
    : "Checking Spotify…";

  useEffect(() => {
    const element = card.current;
    if (!element) return;

    let inView = false;
    let request: AbortController | undefined;

    async function refresh() {
      if (!inView || document.hidden || request) return;

      const controller = new AbortController();
      request = controller;
      try {
        const response = await fetch("/api/spotify/now-playing", { signal: controller.signal });
        if (!response.ok) throw new Error("Spotify status request failed");
        const nextPlayback: SpotifyPlayback = await response.json();
        if (!controller.signal.aborted) setPlayback(nextPlayback);
      } catch {
        if (!controller.signal.aborted) setPlayback({ status: "unavailable" });
      } finally {
        request = undefined;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      void refresh();
    }, { rootMargin: "150px" });
    observer.observe(element);

    const timer = window.setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      observer.disconnect();
      request?.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  return (
    <section ref={card} aria-labelledby="now-playing-title">
      <header className="border-t border-border pt-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-xs font-medium tracking-[.12em] uppercase">
            <span aria-hidden="true" className={track ? "size-2 shrink-0 rounded-full bg-[#1db954]" : "size-2 shrink-0 rounded-full bg-[#a3a3a3]"} />
            {track ? "Playing now" : "Standby"}
          </span>
          <Image src="/spotify-logo.svg" alt="Spotify" width={96} height={26} className="h-auto w-24 shrink-0" />
        </div>
        <h3 id="now-playing-title" className="max-w-[23ch] text-[clamp(1.3rem,2vw,1.85rem)] leading-[1.16] font-semibold tracking-[-.035em]">
          What I’m listening to right now
        </h3>
        <p className="mt-2 text-sm text-ring">Track updates from my Spotify account.</p>
      </header>

      <VinylRecord imageUrl={track?.imageUrl} spinning={Boolean(track)} />

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-y border-border py-3">
        <div aria-live="polite" className="min-w-0 wrap-anywhere">
          <p className="text-base leading-snug font-[560] sm:text-lg">{track?.title ?? message}</p>
          {track && <p className="mt-1 text-sm text-ring">{track.artist}</p>}
        </div>
        {track && (
          <a href={track.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm underline underline-offset-4">
            Open in Spotify <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
