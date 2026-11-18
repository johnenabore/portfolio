"use client";

import { useEffect } from "react";
import { portfolioLinks } from "@/data/portfolio-links";

let greeted = false;
const awayTitle = "👋 Come back!";

// Small touches: a hello in the console for curious developers, and a tab title that waves when you leave.
export function Delights() {
  useEffect(() => {
    if (!greeted) {
      greeted = true;
      console.log(
        "%cHi, fellow developer 👋%c\nThanks for peeking under the hood. Say hello: " + portfolioLinks.contactEmail,
        "font: 600 16px/1.6 system-ui, sans-serif; color: #3a6245;",
        "font: 13px/1.6 system-ui, sans-serif; color: inherit;",
      );
    }

    let savedTitle = document.title;
    function swapTitle() {
      if (document.hidden) {
        savedTitle = document.title;
        document.title = awayTitle;
      } else if (document.title === awayTitle) {
        document.title = savedTitle;
      }
    }

    document.addEventListener("visibilitychange", swapTitle);
    return () => document.removeEventListener("visibilitychange", swapTitle);
  }, []);

  return null;
}
