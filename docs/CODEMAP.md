# Code Map

## Core

- `src/main.jsx`: router and app boot
- `src/App.jsx`: layout shell
- `src/features/home/Home.jsx`: home page
- `src/features/fuel-prices/FuelPrices.jsx`: fuel prices view
- `src/features/pricing-trend/PricingTrend.jsx`: pricing trend view
- `src/features/fuel-tax-comparison/FuelTaxComparison.jsx`: tax comparison view
- `src/features/subsidy-tracker/SubsidyTracker.jsx`: subsidy tracker (Asia)
- `src/features/about/About.jsx`: sources and credits
- `src/features/privacy/Privacy.jsx`: privacy policy

## Data

- `src/core/config.js`: env access
- `src/core/httpClient.js`: authenticated fetch + retries
- `src/api/client.js`: fetchJson re-export

## Components

- `src/ui/LineChart.jsx`: minimal line chart
- `src/ui/CheckboxDropdown.jsx`: multi-select dropdown
- `src/ui/NavBar.jsx`: main nav
- `src/ui/Footer.jsx`: footer
- `src/ui/Icons.jsx`: inline icons
- `src/ui/RollingCards.jsx`: rolling highlights
- `src/ui/DataNotice.jsx`: data coverage notice

## Styles

- `src/styles.css`: theme, layout, motion
- `src/styles/base.css`: global tokens and resets
- `src/styles/components.css`: reusable UI blocks
- `src/styles/insights.css`: page-level layouts
