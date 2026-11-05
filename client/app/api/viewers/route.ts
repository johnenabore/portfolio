import type { NextRequest } from "next/server";
import { activeViewerSeconds, viewerCookie, viewerIdPattern } from "@/lib/viewers";

const heartbeat = `
local now = tonumber(redis.call("TIME")[1])
local total = tonumber(redis.call("GET", KEYS[2]) or "0")
local seen = redis.call("SET", KEYS[3], "1", "EX", 86400, "GET")
if not seen then
  total = redis.call("INCR", KEYS[2])
end
redis.call("ZREMRANGEBYSCORE", KEYS[1], "-inf", now - tonumber(ARGV[2]))
redis.call("ZADD", KEYS[1], now, ARGV[1])
redis.call("EXPIRE", KEYS[1], tonumber(ARGV[2]) * 2)
return { redis.call("ZCARD", KEYS[1]), total }
`;

const headers = { "Cache-Control": "no-store" };

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return Response.json({ status: "unavailable" }, { status: 403, headers });
  }

  const id = request.cookies.get(viewerCookie)?.value;
  if (!id || !viewerIdPattern.test(id)) {
    return Response.json({ status: "unavailable" }, { status: 400, headers });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }

  // Keep local and preview visits out of the public production count.
  const environment = process.env.VERCEL_ENV ?? "development";
  const prefix = `portfolio:viewers:${environment}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL", heartbeat, 3,
        `${prefix}:active`, `${prefix}:total`, `${prefix}:session:${id}`,
        id, activeViewerSeconds,
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Viewer storage unavailable");
    const data: { result?: unknown; error?: string } = await response.json();
    if (
      data.error || !Array.isArray(data.result) || data.result.length !== 2 ||
      !data.result.every((value) => typeof value === "number" && Number.isSafeInteger(value) && value >= 0)
    ) throw new Error("Invalid viewer stats");

    return Response.json({
      status: "ready",
      active: data.result[0],
      total: data.result[1],
    }, { headers });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503, headers });
  }
}
