export type SpotifyPlayback =
  | {
    status: "playing";
    track: { title: string; artist: string; url: string; imageUrl?: string };
  }
  | { status: "idle" | "disconnected" | "unavailable" };
