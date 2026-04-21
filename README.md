# FuelSignal Frontend

FuelSignal is a React single-page app (SPA) that turns curated energy datasets into quick, readable views:
fuel price snapshots, trend comparisons, fuel-tax structures, and subsidy tracking.

## Tech Stack

- Vite + React
- React Router (client-side routing)
- Vitest + Testing Library (unit tests)
- Vercel Analytics (optional; enabled via dependency)

## Quick Start

```bash
npm install
npm run dev
```

Open the dev server URL printed by Vite (typically `http://localhost:5173`).

## Environment Variables

Create a `.env.local` (ignored by git) or set env vars in your deploy environment:

```
VITE_BACKEND_URL=http://localhost:8000
VITE_API_KEY=change_me
```

- `VITE_BACKEND_URL` (required): Base URL for the backend API.
- `VITE_API_KEY` (optional): Sent as `x-api-key` on every request.

### Security Notes (Important)

Because this is a Vite frontend, any `VITE_*` variable is embedded into the browser bundle at build time.
That means `VITE_API_KEY` is **not a secret** and must be treated as **public-client** only.

If you need real authentication/authorization, it must be done server-side (or via an actual user auth flow)
and **must not rely on a client-shipped key**. See `docs/AUTH.md`.

## Scripts

- `npm run dev`: start dev server
- `npm run test`: run unit tests (CI-friendly)
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the production build locally

## Routes

- `/` Home
- `/fuel-prices` Fuel Prices
- `/fuel-tax-comparison` Fuel Tax Comparison
- `/subsidy-tracker` Subsidy Tracker (Asia)
- `/about` About (sources/credits)
- `/privacy` Privacy policy

## Project Docs

- `docs/CODEMAP.md`: key files and where things live
- `docs/ARCHITECTURE.md`: runtime/data-flow notes
- `docs/AUTH.md`: request authentication, API key handling, and security model

## Deployment

This repo includes `vercel.json` to rewrite all routes to `/` for SPA routing.
Any static hosting that supports SPA rewrites will work.

## Contributing

See `CONTRIBUTION GUIDE.md` for PR and documentation requirements.

