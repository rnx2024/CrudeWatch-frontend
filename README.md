# CrudeWatch Frontend

Frontend for CrudeWatch. The UI highlights curated insights, focused country comparisons, and AI briefs from the backend.

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

- Use Insights for top summaries
- Use Market, Retail, and Trends for configurable comparisons
- Generate AI briefs inside Market and Retail

## Routes

- `/` Dashboard overview
- `/market` Market visuals
- `/retail` Retail visuals
- `/trends` Trends time-series
- `/insights` Summary insights
- `/about` About

## Data Sources And Credits

Sources are listed on the About page and must be kept in sync with backend data:

- GlobalPetrolPrices.com
- World Bank Commodity Markets
- US EIA
- Macrotrends
- IMF Climate Data
- IEA World Energy Outlook
- Reuters
- Al Jazeera
- National regulators (OGRA, Moping, NDRC, METI, EPPO, Pertamina)

Kaggle users credited for data cleaning:

- Kavya Dhyani
- zkskhurram
- Muhammad Ammar Tufail
- BELBIN BENO R M

## Backend Endpoints Used

- `GET /data/countries`
- `GET /data/retail-countries`
- `GET /data/metrics`
- `GET /data/country-trend`
- `GET /data/country-compare`
- `GET /data/market-trend`
- `GET /data/market-events`
- `GET /data/top-events`
- `GET /data/affordability`
- `GET /data/vulnerability`
- `GET /data/most-subsidized`
- `GET /data/no-subsidy`
- `GET /data/highest-price-increase`
- `GET /data/top-price-hike`
- `GET /data/trends-average`
- `GET /data/subsidy-summary`
- `GET /data/tax-summary`
- `POST /ai/insights`

## Notes

- Keep UI intentional. Avoid dumping all outputs.
- Any change to data sources or credits must update About + README + docs.
- If you want the cards to also show mini trend bars or icons per category, I can add that next.
