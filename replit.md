# Arys AI

AI chat interface deployed on Cloudflare Workers (backend) + GitHub Pages (frontend).

## Project structure

```
docs/      ← Frontend (HTML/CSS/JS) — served via GitHub Pages
worker/    ← Cloudflare Worker (backend API)
wrangler.toml
```

## Deployed endpoints

- **Worker API:** https://congenial-carnival.ackcrp.workers.dev
- **Frontend:** https://arystal010.github.io/congenial-carnival (GitHub Pages)

## How to redeploy the worker

```bash
npm run deploy          # deploys worker/index.js to Cloudflare
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to be set as Replit Secrets.

## Worker runtime secrets (stored in Cloudflare, not here)

These are pushed to Cloudflare via `wrangler secret put`:
- `OPENROUTER_API_KEY` — AI model responses (required)
- `FIRECRAWL_API_KEY` — Web search (optional)

To update a secret:
```bash
echo "new-value" | npx wrangler secret put SECRET_NAME
```

## Local dev

```bash
npm run dev     # runs wrangler dev (local Worker emulator)
```

## User preferences

- Keep existing Cloudflare Workers + GitHub Pages structure — do not migrate to another hosting model.
