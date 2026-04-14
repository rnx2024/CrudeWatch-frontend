# FuelSignal Frontend

Frontend for FuelSignal. The UI focuses on fuel price snapshots, trend comparisons, tax structures, and subsidy tracking.

## Quick Start

```bash
npm install
npm run dev
```

## Environment

Create `.env.local` with:

```
VITE_BACKEND_URL=http://localhost:8000
VITE_API_KEY=your_backend_key
```

## UX Flow

- Use Fuel Prices for global snapshots and Metro Manila pricing
- Use Pricing Trend for multi-year country trends
- Use Fuel Tax Comparison for regional tax structures
- Use Subsidy Tracker for Asia subsidy status

## Routes

- `/` Home
- `/fuel-prices` Fuel Prices
- `/pricing-trend` Pricing Trend
- `/fuel-tax-comparison` Fuel Tax Comparison
- `/subsidy-tracker` Subsidy Tracker (Asia)
- `/about` About
- `/privacy` Privacy

## Backend Endpoints Used

- `GET /data/fuel-prices`
- `GET /data/current-fuel-prices-mm`
- `GET /data/tax-comparison`
- `GET /data/subsidy-tracker-asia`
