import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./features/about/About";
import Home from "./features/home/Home";
import WorldData from "./features/world-data/WorldData";
import FuelPrices from "./features/fuel-prices/FuelPrices";
import PricingTrend from "./features/pricing-trend/PricingTrend";
import FuelTaxComparison from "./features/fuel-tax-comparison/FuelTaxComparison";
import SubsidyTracker from "./features/subsidy-tracker/SubsidyTracker";
import Privacy from "./features/privacy/Privacy";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fuel-prices" element={<FuelPrices />} />
          <Route path="/pricing-trend" element={<PricingTrend />} />
          <Route path="/fuel-tax-comparison" element={<FuelTaxComparison />} />
          <Route path="/subsidy-tracker" element={<SubsidyTracker />} />
          <Route path="/world-data" element={<WorldData />} />
          <Route path="/insights" element={<WorldData />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
