import { useEffect, useMemo, useState } from "react";
import { getUserMessage } from "../../core/errors";
import CheckboxDropdown from "../../ui/CheckboxDropdown";
import LineChart from "../../ui/LineChart";
import SectionHeader from "../../ui/SectionHeader";
import {
  extractRegionCountries,
  fetchFuelPriceOptions,
  fetchFuelPrices,
} from "../fuel-prices/api";

const metricOptions = [
  { value: "petrol_usd_liter", label: "Petrol (USD/L)" },
  { value: "diesel_usd_liter", label: "Diesel (USD/L)" },
  { value: "lpg_usd_liter", label: "LPG (USD/L)" },
  { value: "brent_crude_usd", label: "Brent Crude (USD/bbl)" },
  { value: "tax_percentage", label: "Tax Percentage (%)" },
];

function formatDate(value) {
  if (!value) return "—";
  const str = String(value);
  return str.includes("T") ? str.slice(0, 10) : str;
}

function formatMonth(value) {
  return formatDate(value).slice(0, 7);
}

function toYear(value) {
  const dateStr = formatDate(value);
  const year = Number(dateStr.slice(0, 4));
  return Number.isNaN(year) ? null : year;
}

export default function PricingTrend() {
  const [available, setAvailable] = useState({ countries: [], regions: [], years: [] });
  const [rows, setRows] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [region, setRegion] = useState("Asia");
  const [countryOptions, setCountryOptions] = useState([]);
  const [metric, setMetric] = useState(metricOptions[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchFuelPrices({ years: ["2024", "2025", "2026"] });
        const regions = response.available.regions || [];
        const asiaRegion =
          regions.find((item) => String(item).toLowerCase() === "asia") || regions[0] || "";
        let scoped = response;
        if (asiaRegion) {
          scoped = await fetchFuelPrices({ region: asiaRegion, years: ["2024", "2025", "2026"] });
        }
        setAvailable(scoped.available);
        setRows(scoped.rows);
        setCountryOptions(scoped.available.countries || []);
        const defaultYears = scoped.available.years.slice(-3) || [];
        const defaultCountries = [];
        setYears(defaultYears.map(String));
        setCountries(defaultCountries);
        setRegion(asiaRegion);
      } catch (err) {
        console.error("Pricing trend load failed", err);
        setError(getUserMessage(err, "Failed to load pricing trend."));
      } finally {
        setLoading(false);
        setReady(true);
      }
    }
    loadInitial();
  }, []);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    async function loadOptions() {
      try {
        const response = await fetchFuelPriceOptions({ region, years });
        if (!active) return;
        setAvailable(response.available);
        const rowList = extractRegionCountries(response.rows, region);
        setCountryOptions(rowList.length ? rowList : response.available.countries || []);
      } catch (err) {
        if (!active) return;
        console.error("Pricing trend options load failed", err);
      }
    }
    loadOptions();
    return () => {
      active = false;
    };
  }, [ready, region, years]);

  useEffect(() => {
    if (!ready) return;
    async function loadFiltered() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchFuelPrices({ region, countries, years });
        setRows(response.rows);
      } catch (err) {
        console.error("Pricing trend filter load failed", err);
        setError(getUserMessage(err, "Failed to load pricing trend."));
      } finally {
        setLoading(false);
      }
    }
    loadFiltered();
  }, [ready, region, countries, years]);

  const filteredRows = useMemo(() => {
    const yearSet = new Set(years.map((value) => String(value)));
    return rows.filter((row) => {
      if (region && row.region !== region) {
        return false;
      }
      if (countries.length && !countries.includes(row.country)) {
        return false;
      }
      if (years.length) {
        const rowYear = toYear(row.date);
        if (!rowYear || !yearSet.has(String(rowYear))) {
          return false;
        }
      }
      return true;
    });
  }, [rows, years]);

  const regionCountries = useMemo(() => {
    const base = countryOptions.length ? countryOptions : available.countries || [];
    return Array.from(new Set(base.filter(Boolean))).sort();
  }, [countryOptions, available.countries]);

  useEffect(() => {
    if (!regionCountries.length || !countries.length) return;
    const filtered = countries.filter((country) => regionCountries.includes(country));
    if (filtered.length !== countries.length) {
      setCountries(filtered);
    }
  }, [regionCountries, countries]);

  const series = useMemo(() => {
    const grouped = new Map();
    filteredRows.forEach((row) => {
      const country = row.country;
      const value = Number(row[metric]);
      if (!country || Number.isNaN(value)) return;
      if (!grouped.has(country)) grouped.set(country, []);
      grouped.get(country).push({
        label: formatMonth(row.date),
        value,
      });
    });
    return Array.from(grouped.entries()).map(([country, points]) => ({
      label: country,
      points: points.sort((a, b) => (a.label > b.label ? 1 : -1)),
    }));
  }, [filteredRows, metric]);

  const missingCountries = useMemo(() => {
    if (!countries.length) return [];
    const existing = new Set(series.map((line) => line.label));
    return countries.filter((country) => !existing.has(country));
  }, [series, countries]);

  const showLoading = loading && rows.length === 0;
  const showEmptySelection = !countries.length;

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Pricing Trend"
        title="Monthly price trends by country"
        subtitle="Select a region and compare countries within that region."
      />

      <div className="insight-panel pricing-panel">
        <div className="filter-bar">
          <label className="compact-field">
            <span className="control-label">Metric</span>
            <select value={metric} onChange={(e) => setMetric(e.target.value)}>
              {metricOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="compact-field">
            <span className="control-label">Region</span>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setCountries([]);
              }}
            >
              {(available.regions || []).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="trend-filters">
          <CheckboxDropdown
            label="Select Years"
            options={(available.years || []).map(String)}
            values={years}
            onChange={setYears}
            allowSelectAll
            placeholder="Select years"
            variant="multi"
          />
          <CheckboxDropdown
            label="Select Countries"
            options={regionCountries}
            values={countries}
            onChange={setCountries}
            placeholder="Select countries"
            variant="multi"
          />
        </div>


        {error ? <div className="data-error">{error}</div> : null}
        {showLoading ? <div className="data-loading">Loading pricing trend…</div> : null}
        {showEmptySelection ? (
          <div className="data-empty">Select one or more countries to plot trends.</div>
        ) : null}
        {!showEmptySelection && missingCountries.length ? (
          <div className="data-empty">
            No data for {missingCountries.join(", ")} in the selected range.
          </div>
        ) : null}

        {!showEmptySelection ? (
          <LineChart
            series={series}
            xLabel="Month"
            yLabel={metricOptions.find((item) => item.value === metric)?.label || metric}
          />
        ) : (
          <div className="chart-empty">No data to display.</div>
        )}
      </div>
    </section>
  );
}
