import { connection } from "next/server";
import type { SpotifyPlayback } from "@/lib/spotify/playback";

type SpotifyTrack = {
  type: string;
  is_local?: boolean;
  name: string;
  artists: { name: string }[];
  external_urls?: { spotify?: string };
  album?: { images?: { url: string }[] };
};

let access: { token: string; expiresAt: number } | undefined;
let rotatedRefreshToken: string | undefined;
let retryAfter = 0;
let cached: { playback: SpotifyPlayback; expiresAt: number } | undefined;
let pending: Promise<SpotifyPlayback> | undefined;

function respectRateLimit(response: Response) {
  if (response.status !== 429) return;

  const seconds = Number(response.headers.get("Retry-After")) || 30;
  retryAfter = Date.now() + seconds * 1000;
}

async function refreshAccess(clientId: string, clientSecret: string, refreshToken: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: rotatedRefreshToken ?? refreshToken,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  respectRateLimit(response);
  if (!response.ok) return;

  const data: { access_token: string; expires_in: number; refresh_token?: string } = await response.json();
  if (data.refresh_token) rotatedRefreshToken = data.refresh_token;
  access = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 30) * 1000 };
}

async function readPlayback(): Promise<SpotifyPlayback> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return { status: "disconnected" };
  }

  if (Date.now() < retryAfter) return { status: "unavailable" };

  if (!access || Date.now() >= access.expiresAt) {
    await refreshAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN);
  }
  if (!access || Date.now() >= access.expiresAt) return { status: "unavailable" };

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${access.token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  respectRateLimit(response);
  if (response.status === 401) access = undefined;
  if (response.status === 204) return { status: "idle" };
  if (!response.ok) return { status: "unavailable" };

  const data: { is_playing?: boolean; device?: { is_private_session?: boolean }; item?: SpotifyTrack } = await response.json();
  const item = data.item;
  const url = item?.external_urls?.spotify;
  if (
    !data.is_playing || data.device?.is_private_session || item?.type !== "track" ||
    item.is_local || !url?.startsWith("https://open.spotify.com/track/")
  ) return { status: "idle" };

  return {
    status: "playing",
    track: {
      title: item.name,
      artist: item.artists.map(({ name }) => name).join(", "),
      url,
      imageUrl: item.album?.images?.find(({ url }) => url.startsWith("https://i.scdn.co/"))?.url,
    },
  };
}

export async function GET() {
  await connection();

  if (!cached || Date.now() >= cached.expiresAt) {
    pending ??= readPlayback()
      .catch((): SpotifyPlayback => ({ status: "unavailable" }))
      .then((playback) => {
        cached = { playback, expiresAt: Date.now() + 20_000 };
        pending = undefined;
        return playback;
      });
    await pending;
  }

  return Response.json(cached?.playback ?? { status: "unavailable" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
