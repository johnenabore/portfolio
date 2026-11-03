"use client";

import { useEffect } from "react";
import { playUiSound } from "@/lib/ui-sounds";

export function UiClickSound() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.isTrusted) playUiSound("click");
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
