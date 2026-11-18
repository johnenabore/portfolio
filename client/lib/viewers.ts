export const viewerHeartbeatMs = 45_000;
export const activeViewerSeconds = 90;
export const viewerCookie = "portfolio-viewer";
export const viewerIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type ViewerStats =
  | { status: "loading" | "unavailable" }
  /** The counter isn't configured here (no Redis keys), e.g. local development. */
  | { status: "disabled" }
  | { status: "ready"; active: number; total: number };
