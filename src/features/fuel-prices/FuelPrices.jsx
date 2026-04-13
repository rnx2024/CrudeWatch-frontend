import { useEffect, useMemo, useState } from "react";
import { getUserMessage } from "../../core/errors";
import CheckboxDropdown from "../../ui/CheckboxDropdown";
import LineChart from "../../ui/LineChart";
import SectionHeader from "../../ui/SectionHeader";
import {
  extractRegionCountries,
  fetchFuelPriceOptions,
  fetchFuelPrices,
  fetchMetroManilaPricing,
} from "./api";

function formatNumber(value, suffix = "") {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return `${num.toFixed(2)}${suffix}`;
}

function formatDate(value) {
  if (!value) return "—";
  const str = String(value);
  return str.includes("T") ? str.slice(0, 10) : str;
}

function formatMonth(value) {
  const dateStr = formatDate(value);
  return dateStr.slice(0, 7);
}

function toYear(value) {
  const dateStr = formatDate(value);
  const year = Number(dateStr.slice(0, 4));
  return Number.isNaN(year) ? null : year;
}

const metricOptions = [
  {
    value: "petrol_usd_liter",
    label: "Petrol (USD/L)",
    description: "Retail petrol pricing across countries.",
    suffix: " USD/L",
  },
  {
    value: "diesel_usd_liter",
    label: "Diesel (USD/L)",
    description: "Diesel pricing comparisons.",
    suffix: " USD/L",
  },
  {
    value: "lpg_usd_liter",
    label: "LPG (USD/L)",
    description: "Liquefied petroleum gas pricing.",
    suffix: " USD/L",
  },
  {
    value: "brent_crude_usd",
    label: "Brent Crude (USD/bbl)",
    description: "Crude benchmark for context.",
    suffix: " USD/bbl",
  },
  {
    value: "tax_percentage",
    label: "Tax Percentage (%)",
    description: "Tax share applied to fuel pricing.",
    suffix: "%",
  },
];

export default function FuelPrices() {
  const [rows, setRows] = useState([]);
  const [available, setAvailable] = useState({
    countries: [],
    regions: [],
    years: [],
  });
  const [region, setRegion] = useState("all");
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [metric, setMetric] = useState(metricOptions[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mmPricing, setMmPricing] = useState({ as_of: null, rows: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchFuelPrices({ years: ["2024", "2025", "2026"] });
        setAvailable(response.available);
        setRows(response.rows);
        setCountryOptions(response.available.countries || []);
        const defaultYears = response.available.years.slice(-3) || [];
        setYears(defaultYears.map(String));
        setCountries([]);
      } catch (err) {
        console.error("Fuel prices load failed", err);
        setError(getUserMessage(err, "Failed to load fuel prices."));
      } finally {
        setLoading(false);
        setReady(true);
      }
    }

    async function loadMm() {
      try {
        const response = await fetchMetroManilaPricing();
        setMmPricing(response);
      } catch (err) {
        console.error("Metro Manila pricing load failed", err);
        setMmPricing({ as_of: null, rows: [] });
      }
    }

    loadInitial();
    loadMm();
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
        console.error("Fuel prices options load failed", err);
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
        console.error("Fuel prices filter load failed", err);
        setError(getUserMessage(err, "Failed to load fuel prices."));
      } finally {
        setLoading(false);
      }
    }
    loadFiltered();
  }, [ready, region, countries, years]);

  const metricMeta = metricOptions.find((item) => item.value === metric) || metricOptions[0];

  const filteredRows = useMemo(() => {
    if (!countries.length) {
      return [];
    }
    const yearSet = new Set(years.map((value) => String(value)));
    return rows.filter((row) => {
      if (!countries.includes(row.country)) {
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
  }, [rows, years, countries]);

  const regionCountries = useMemo(() => {
    const base = countryOptions.length ? countryOptions : available.countries || [];
    return Array.from(new Set(base.filter(Boolean))).sort();
  }, [countryOptions, available.countries]);

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

  useEffect(() => {
    if (!ready) return;
    if (region === "all") return;
    if (!regionCountries.length) return;
    const invalid = countries.filter((country) => !regionCountries.includes(country));
    if (invalid.length) {
      setCountries(countries.filter((country) => regionCountries.includes(country)));
    }
  }, [ready, region, regionCountries, countries]);

  const mmSummary = useMemo(() => {
    const grouped = new Map();
    mmPricing.rows.forEach((row) => {
      const type = row.type || row.Type;
      if (!type) return;
      const entry = grouped.get(type) || { values: [], changes: [] };
      const price = Number(
        row.avg_price_l ||
          row["avg_price/l"] ||
          row["Avg Price/L"] ||
          row.avg_price
      );
      const change = Number(
        row.vs_prev_week ||
          row["vs_prev._week"] ||
          row["vs prev. week"]
      );
      if (!Number.isNaN(price)) entry.values.push(price);
      if (!Number.isNaN(change)) entry.changes.push(change);
      grouped.set(type, entry);
    });
    return Array.from(grouped.entries()).map(([type, data]) => {
      const min = data.values.length ? Math.min(...data.values) : null;
      const max = data.values.length ? Math.max(...data.values) : null;
      const avgChange = data.changes.length
        ? data.changes.reduce((sum, val) => sum + val, 0) / data.changes.length
        : null;
      return { type, min, max, avgChange };
    });
  }, [mmPricing]);

  const metricIndex = metricOptions.findIndex((item) => item.value === metric);
  const moveMetric = (direction) => {
    const next = (metricIndex + direction + metricOptions.length) % metricOptions.length;
    setMetric(metricOptions[next].value);
  };

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Fuel Prices"
        title="Fuel price comparison (2020–2026)"
        subtitle="Select regions, years, and countries to compare fuel pricing signals."
      />

      <div className="pricing-columns">
        <div className="pricing-panel">
          <div className="metric-carousel">
            <button className="scroll-btn" type="button" onClick={() => moveMetric(-1)}>
              ←
            </button>
            <div className="card metric-card" key={metricMeta.value}>
              <h3>{metricMeta.label}</h3>
              <p>{metricMeta.description}</p>
            </div>
            <button className="scroll-btn" type="button" onClick={() => moveMetric(1)}>
              →
            </button>
          </div>

          <div className="filter-bar">
            <label className="compact-field">
              <span className="control-label">Region</span>
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCountries([]);
                }}
              >
                <option value="all">All regions</option>
                {(available.regions || []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
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
        </div>

        <div className="selection-row">
          <CheckboxDropdown
            label="Select Years"
            options={(available.years || []).map(String)}
            values={years}
            onChange={setYears}
            placeholder="Select years"
          />
          <CheckboxDropdown
            label="Select Countries"
            options={regionCountries}
            values={countries}
            onChange={setCountries}
            placeholder="Select countries"
          />
        </div>



          {error ? <div className="data-error">{error}</div> : null}
          {loading ? <div className="data-loading">Loading fuel prices…</div> : null}
          {!countries.length ? (
            <div className="data-empty">Select one or more countries to plot trends.</div>
          ) : null}
          {countries.length && missingCountries.length ? (
            <div className="data-empty">
              No data for {missingCountries.join(", ")} in the selected range.
            </div>
          ) : null}

          {countries.length ? (
            <LineChart series={series} xLabel="Month" yLabel={metricMeta.label} />
          ) : (
            <div className="chart-empty">No data to display.</div>
          )}
        </div>

        <div className="pricing-panel">
          <SectionHeader
            eyebrow="Current Pricing (Metro Manila, PH)"
            title="Latest Metro Manila retail pricing"
            subtitle="Range across brands with week-on-week change."
          />
          <div className="pricing-card-grid">
            {mmSummary.map((row) => (
              <div key={row.type} className="card accent pricing-card">
                <h4>{row.type}</h4>
                <div className="pricing-values">
                  <div>
                    <span>Range</span>
                    <strong>
                      {formatNumber(row.min, " PHP/L")} – {formatNumber(row.max, " PHP/L")}
                    </strong>
                  </div>
                  <div>
                    <span>Avg change vs prev. week</span>
                    <strong>{formatNumber(row.avgChange, " PHP/L")}</strong>
                  </div>
                </div>
                <div className="pricing-date">
                  As of {mmPricing.as_of ? formatDate(mmPricing.as_of) : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
