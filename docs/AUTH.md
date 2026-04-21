# Frontend Auth / API Key Model

FuelSignal currently does **not** implement user authentication (no login, sessions, JWTs, etc.).
Instead, it optionally attaches a single request header to backend requests:

- Header: `x-api-key`
- Source: `VITE_API_KEY` (from Vite build-time env)

## What This Means

- The frontend is a **public client**.
- Any value placed into `VITE_API_KEY` is shipped to every browser at build time (because it is a `VITE_*` env var).
- Therefore, `VITE_API_KEY` must be treated as **non-secret**.

This key can be useful as a lightweight app identifier for:

- basic rate limiting / abuse detection
- traffic segmentation
- soft gating of endpoints that still remain safe if the key leaks

It must **not** be used as a privileged secret.

## Recommended Backend Controls

If the backend uses `x-api-key`, it should still assume the value can leak and enforce:

- CORS allowlist (at least for browsers)
- rate limiting per IP/key
- strict input validation
- server-side authorization for any privileged data/actions

## If You Need Real Authentication

Use a real auth mechanism that does not require shipping a secret to the browser, for example:

- OAuth 2.0 Authorization Code with PKCE (for browser apps)
- a backend session cookie issued after login
- a third-party identity provider with short-lived user tokens

Important: a Google OAuth `client_secret_*.json` file must never be used in a frontend repo.
Only the OAuth client **ID** belongs in browser code.
