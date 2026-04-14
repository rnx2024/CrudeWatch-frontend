# Architecture

## Runtime

- Vite + React + React Router
- Single-page app with `/`, `/fuel-prices`, `/pricing-trend`, `/fuel-tax-comparison`, `/subsidy-tracker`, `/about`, `/privacy`

## Data Flow

- UI requests curated endpoints only
- Responses drive charts and summary cards
- API key is stored in `.env.local`

## UX Principles

- Minimal steps to get insight
- Clear defaults and bounded options
- Avoid exposing raw tables
