"use client";

import { useEffect, useRef } from "react";

type WalkthroughMedia = { src: string; poster: string };

export function ProjectWalkthrough({
  title,
  landscape,
  portrait,
}: {
  title: string;
  landscape: WalkthroughMedia;
  portrait: WalkthroughMedia;
}) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    function updatePoster() {
      if (player.current) player.current.poster = mobile.matches ? portrait.poster : landscape.poster;
    }
    updatePoster();
    mobile.addEventListener("change", updatePoster);
    return () => mobile.removeEventListener("change", updatePoster);
  }, [landscape.poster, portrait.poster]);

  return (
    <figure>
      <video
        ref={player}
        aria-label={`${title} walkthrough`}
        controls
        playsInline
        preload="none"
        poster={landscape.poster}
        className="aspect-[9/16] w-full rounded-xl bg-primary object-contain md:aspect-video"
      >
        <source src={landscape.src} media="(min-width: 768px)" type="video/mp4" />
        <source src={portrait.src} type="video/mp4" />
        Your browser does not support embedded video. <a href={landscape.src}>Open the walkthrough</a>.
      </video>
    </figure>
  );
}
