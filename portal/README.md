# DayCent API Portal (RegenLab / RAS)

The authenticated API portal — login, dashboard, API-key management, and admin user
management for the DayCent quantification API. It is a self-contained React + TypeScript
+ Vite SPA (React Query, axios, Tailwind v4, HashRouter) and is served as a static bundle
**under `/app/`** of the main `regenlab.tech` site.

## How it integrates with the main site

- This app builds into **`../public/app`** (i.e. `regenlab-tech/public/app/`).
- Vite serves everything in `public/` at the site root, so the portal is available at
  **`/app/`** in both `npm run dev` and the production build (`dist/app/`).
- The main site links to it with a plain `<a href="/app/">` (a real navigation, not a
  React-Router link), so the browser loads this separate SPA.
- `base` is set to `/app/` and the app uses `HashRouter`, so internal routes look like
  `/app/#/login`, `/app/#/dashboard`, `/app/#/api-keys`, `/app/#/admin/users`.

## Rebuilding the portal

```bash
cd regenlab-tech/portal
npm install
npm run build        # tsc -b && vite build → outputs to ../public/app
# (or: npx vite build   to skip the TypeScript type-check)
```

Then commit the regenerated `regenlab-tech/public/app/` along with your changes.
`node_modules/` and `dist/` here are git-ignored; the **built output lives in the site's
`public/app/`**, which is what ships.

## Backend dependency (important)

The portal talks to the DayCent API gateway. The base URL is configurable:

```
# regenlab-tech/portal/.env   (see .env.example)
VITE_API_URL=https://api.regenaisolutions.com/gateway
```

- If unset, it defaults to `https://api.regenaisolutions.com/gateway`.
- **Login, dashboard, credits, and API keys only function when that gateway is reachable**
  and you have valid credentials. The portal UI loads and routes regardless, but live data
  requires the backend.
- If the API domain changes (e.g. away from `regenaisolutions.com`), set `VITE_API_URL`
  **before** running `npm run build`.

## Routes

| Path | Page |
|------|------|
| `/app/#/login` | Login (OAuth2 password grant → `/v1/auth/login`) |
| `/app/#/dashboard` | User dashboard (profile, remaining credit) |
| `/app/#/api-keys` | Create / manage API keys |
| `/app/#/admin/users` | Admin-only user management |
