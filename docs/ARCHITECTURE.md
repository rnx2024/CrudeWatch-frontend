# Architecture

## Runtime

- Vite + React + React Router
- Single-page app with `/`, `/fuel-prices`, `/pricing-trend`, `/fuel-tax-comparison`, `/subsidy-tracker`, `/about`, `/privacy`

## Data Flow

- UI requests curated endpoints only
- Responses drive charts and summary cards
- Optional `x-api-key` is configured via `VITE_API_KEY` (public-client only; see `docs/AUTH.md`)

## UX Principles

- Minimal steps to get insight
- Clear defaults and bounded options
- Avoid exposing raw tables
