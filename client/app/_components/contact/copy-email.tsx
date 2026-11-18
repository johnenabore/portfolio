"use client";

import { useEffect, useRef, useState } from "react";
import { playUiSound } from "@/lib/ui-sounds";

type Status = "idle" | "copied" | "failed";

// Copies the email address and confirms with a small toast.
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    let next: Status = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    // The global click sound already confirms a successful press.
    if (next === "failed") playUiSound("error");
    setStatus(next);
    setAttempt((value) => value + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm text-white/85 transition-colors hover:border-white hover:text-white focus-visible:border-white"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
        </svg>
        Copy email
      </button>
      <span aria-live="polite" className="pointer-events-none absolute bottom-[calc(100%+.5rem)] left-1/2 -translate-x-1/2">
        {status !== "idle" && (
          <span
            key={attempt}
            className="block rounded-full bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-primary shadow-[0_.5rem_1.25rem_#0004] site-motion:animate-toast-in"
          >
            {status === "copied" ? "Email copied ✓" : "Couldn’t copy. Select the address instead."}
          </span>
        )}
      </span>
    </span>
  );
}
