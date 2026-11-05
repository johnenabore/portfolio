"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { viewerCookie, viewerHeartbeatMs, viewerIdPattern, type ViewerStats } from "@/lib/viewers";

const ViewerContext = createContext<ViewerStats>({ status: "loading" });

function ensureViewerId() {
  const existing = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${viewerCookie}=`))?.split("=")[1];
  if (existing && viewerIdPattern.test(existing)) return;

  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${viewerCookie}=${crypto.randomUUID()}; Path=/; SameSite=Lax${secure}`;
}

export function ViewerProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<ViewerStats>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    let pending = false;

    async function heartbeat() {
      if (document.hidden || pending || controller.signal.aborted) return;
      pending = true;
      try {
        if (navigator.locks) {
          await navigator.locks.request("portfolio-viewer-session", { signal: controller.signal }, ensureViewerId);
        } else {
          ensureViewerId();
        }
        const response = await fetch("/api/viewers", {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Viewer stats unavailable");

        const result: ViewerStats = await response.json();
        if (
          result.status !== "ready" ||
          !Number.isSafeInteger(result.active) || result.active < 0 ||
          !Number.isSafeInteger(result.total) || result.total < 0
        ) throw new Error("Invalid viewer stats");

        if (!controller.signal.aborted) setStats(result);
      } catch {
        if (!controller.signal.aborted) {
          setStats({ status: "unavailable" });
        }
      } finally {
        pending = false;
      }
    }

    void heartbeat();
    const interval = window.setInterval(heartbeat, viewerHeartbeatMs);
    document.addEventListener("visibilitychange", heartbeat);
    window.addEventListener("online", heartbeat);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", heartbeat);
      window.removeEventListener("online", heartbeat);
    };
  }, []);

  return <ViewerContext value={stats}>{children}</ViewerContext>;
}

export function useViewerStats() {
  return useContext(ViewerContext);
}
