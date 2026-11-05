import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { parseEnv } from "node:util";

const redirect = new URL("http://127.0.0.1:8888/callback");
const envFile = new URL("../.env.local", import.meta.url);

function requestAuthorization(clientId) {
  const state = randomBytes(24).toString("hex");
  const authorize = new URL("https://accounts.spotify.com/authorize");
  authorize.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirect.href,
    scope: "user-read-currently-playing",
    state,
  }).toString();

  return new Promise((resolve, reject) => {
    const server = createServer((request, response) => {
      const callback = new URL(request.url, redirect);
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.setHeader("Cache-Control", "no-store");

      if (request.method !== "GET" || callback.pathname !== redirect.pathname) {
        response.writeHead(404).end("Not found.");
        return;
      }
      if (callback.searchParams.get("state") !== state) {
        response.writeHead(400).end("This callback does not match the active setup. Open the link from your terminal.");
        return;
      }

      const code = callback.searchParams.get("code");
      if (!code || callback.searchParams.has("error")) {
        response.writeHead(400).end("Spotify authorization was declined. Return to your terminal.");
        reject(new Error("Spotify authorization was declined. Run the setup again and click Agree."));
      } else {
        response.end("Spotify authorization received. Return to your terminal to finish setup.");
        resolve(code);
      }
      server.close();
    });

    server.once("error", (error) => {
      reject(new Error(error.code === "EADDRINUSE"
        ? "Port 8888 is already in use. Stop the app using that port and try again."
        : "Could not start the local Spotify callback listener."));
    });
    server.listen(Number(redirect.port), redirect.hostname, () => {
      const timeout = setTimeout(() => {
        reject(new Error("Spotify authorization timed out. Run the setup again."));
        server.close();
      }, 5 * 60_000);
      server.once("close", () => clearTimeout(timeout));
      console.log(`Open this link, sign in to Spotify, and click Agree:\n\n${authorize.href}\n`);
    });
  });
}

async function saveRefreshToken(refreshToken) {
  const previous = await readFile(envFile, "utf8");
  const refreshEntry = /^\s*(?:export\s+)?SPOTIFY_REFRESH_TOKEN\s*=/;
  const existing = previous.split(/\r?\n/).filter((line) => !refreshEntry.test(line)).join("\n").trimEnd();
  await writeFile(envFile, `${existing}\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`, { mode: 0o600 });
}

async function connect() {
  const settings = await readFile(envFile, "utf8").catch((error) => {
    if (error.code === "ENOENT") throw new Error("Create client/.env.local and add your Spotify Client ID and Client Secret.");
    throw error;
  });
  const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = parseEnv(settings);
  if (!clientId || !clientSecret) throw new Error("Fill in SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in client/.env.local.");

  const code = await requestAuthorization(clientId);
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { Authorization: `Basic ${basic}` },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect.href }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Spotify rejected the token exchange (HTTP ${response.status}). Check the client credentials and redirect URI.`);

  const { access_token: accessToken, refresh_token: refreshToken } = await response.json();
  if (!accessToken || !refreshToken) throw new Error("Spotify did not return the tokens needed to connect.");

  const playback = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (playback.status === 403) {
    throw new Error("Spotify denied playback access. Check that the app owner has Premium and that your listening account is allowed in the app settings.");
  }
  if (!playback.ok) throw new Error(`Spotify playback access could not be verified (HTTP ${playback.status}).`);

  await saveRefreshToken(refreshToken);
  console.log("Spotify connected. Refresh token saved to client/.env.local. Restart the portfolio dev server.");
}

connect().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
