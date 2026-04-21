# Code Map

## Core

- `src/main.jsx`: router and app boot
- `src/App.jsx`: layout shell
- `src/features/not-found/NotFound.jsx`: catch-all route
- `src/features/home/Home.jsx`: home page (hero + highlights)
- `src/features/fuel-prices/FuelPrices.jsx`: fuel prices view
- `src/features/fuel-tax-comparison/FuelTaxComparison.jsx`: tax comparison view
- `src/features/subsidy-tracker/SubsidyTracker.jsx`: subsidy tracker (Asia)
- `src/features/about/About.jsx`: sources and credits
- `src/features/privacy/Privacy.jsx`: privacy policy

## Data

- `src/core/config.js`: env access
- `src/core/httpClient.js`: authenticated fetch + retries
- `src/api/client.js`: fetchJson re-export

## Components

- `src/features/home/CommuteHeroSvg.jsx`: animated hero SVG (bus/road/sky motion; billboard text is embedded here)
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
- `src/styles/components.css`: reusable UI blocks (includes `.commute-*` hero SVG animations + reduced motion rules)
- `src/styles/insights.css`: page-level layouts
