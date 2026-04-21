import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./features/about/About";
import Home from "./features/home/Home";
import FuelPrices from "./features/fuel-prices/FuelPrices";
import PricingTrend from "./features/pricing-trend/PricingTrend";
import FuelTaxComparison from "./features/fuel-tax-comparison/FuelTaxComparison";
import SubsidyTracker from "./features/subsidy-tracker/SubsidyTracker";
import Privacy from "./features/privacy/Privacy";
import NotFound from "./features/not-found/NotFound";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="fuel-prices" element={<FuelPrices />} />
          <Route path="pricing-trend" element={<PricingTrend />} />
          <Route path="fuel-tax-comparison" element={<FuelTaxComparison />} />
          <Route path="subsidy-tracker" element={<SubsidyTracker />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
