# John Enabore Portfolio

A Next.js portfolio with an animated portrait hero and a filterable Selected Work gallery.

## Run locally

```sh
cd client
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Run `npm run lint` and `npm run build` before pushing changes.

## Update the portfolio

- Add real projects in [projects.ts](client/data/projects.ts). The gallery and project count update from the same list. The first project gets the featured spot.
- Set `PORTFOLIO_SITE_URL` to the public site origin (including `https://`) on your hosting platform before building so social previews use the deployed URL.
- Set résumé, contact, and social URLs in [portfolio-links.ts](client/data/portfolio-links.ts).

## Connect Spotify

1. In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), create or open your Web API app. Add and save `http://127.0.0.1:8888/callback` under Redirect URIs.
2. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `client/.env.local`, then run `npm run spotify:connect` from `client`.
3. Open the link printed in the terminal and click **Agree** using the account you listen on. The command verifies playback access and fills in `SPOTIFY_REFRESH_TOKEN` in `client/.env.local`.
4. Restart the dev server, play a track, and check About Me.

For deployment, set the same variables in your host's server environment.

```dotenv
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

The card displays your current public playback to visitors. Leave the variables unset to disconnect it. Keep the secret and refresh token in the server environment. If Spotify expires your refresh token, run `npm run spotify:connect` again.

Sound effects by [Kenney](https://kenney.nl/assets/interface-sounds), released under CC0.

## Visitor counts

Connect an Upstash Redis Free database to the Vercel project through Storage, then redeploy. The app accepts either `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or the integration's `KV_REST_API_URL` and `KV_REST_API_TOKEN`. For local testing, paste the same REST credentials into `client/.env.local` and restart the dev server.

The menu shows active browser sessions seen in the last 90 seconds and total visits counted once per browser session. Heartbeats run every 45 seconds while the page is visible. Counts start when the database is connected. Local, preview, and production counts use separate Redis keys. Database credentials stay on the server.
