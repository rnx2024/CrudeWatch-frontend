import { useEffect, useMemo, useState } from "react";
import { getUserMessage } from "../../core/errors";
import CheckboxDropdown from "../../ui/CheckboxDropdown";
import SectionHeader from "../../ui/SectionHeader";
import { fetchTaxComparison } from "./api";

const metricOptions = [
  { value: "gasoline_tax_pct", label: "Gasoline tax (%)", suffix: "%" },
  { value: "diesel_tax_pct", label: "Diesel tax (%)", suffix: "%" },
  { value: "vat_pct", label: "VAT (%)", suffix: "%" },
  { value: "excise_usd_per_liter", label: "Excise (USD/L)", suffix: " USD/L" },
  {
    value: "total_tax_usd_per_liter",
    label: "Total tax (USD/L)",
    suffix: " USD/L",
  },
];

function formatNumber(value, suffix = "") {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return `${num.toFixed(2)}${suffix}`;
}

export default function FuelTaxComparison() {
  const [rows, setRows] = useState([]);
  const [available, setAvailable] = useState({ regions: [], countries: [] });
  const [region, setRegion] = useState("all");
  const [countries, setCountries] = useState([]);
  const [metric, setMetric] = useState(metricOptions[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchTaxComparison({ region, countries });
        setRows(response.rows);
        setAvailable(response.available);
        if (!countries.length) {
          const defaultCountries = response.available.countries.slice(0, 6) || [];
          setCountries(defaultCountries);
        }
      } catch (err) {
        console.error("Tax comparison load failed", err);
        setError(getUserMessage(err, "Failed to load tax comparison."));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [region, countries.length]);

  useEffect(() => {
    async function reload() {
      if (!countries.length) return;
      setLoading(true);
      setError("");
      try {
        const response = await fetchTaxComparison({ region, countries });
        setRows(response.rows);
      } catch (err) {
        console.error("Tax comparison filter load failed", err);
        setError(getUserMessage(err, "Failed to load tax comparison."));
      } finally {
        setLoading(false);
      }
    }
    reload();
  }, [region, countries]);

  const metricMeta = metricOptions.find((item) => item.value === metric) || metricOptions[0];

  const chartRows = useMemo(() => {
    return rows
      .map((row) => ({
        country: row.country,
        value: Number(row[metric]),
      }))
      .filter((row) => row.country && !Number.isNaN(row.value))
      .sort((a, b) => b.value - a.value);
  }, [rows, metric]);

  const chartMax = useMemo(() => {
    if (!chartRows.length) return 0;
    return Math.max(...chartRows.map((row) => row.value));
  }, [chartRows]);

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Fuel Tax Comparison"
        title="Compare tax structure by country"
        subtitle="Select a region and compare tax components across countries."
      />

      <div className="pricing-panel">
        <div className="filter-bar">
          <label className="compact-field">
            <span className="control-label">Region</span>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="all">All regions</option>
              {(available.regions || []).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="compact-field">
            <span className="control-label">Chart metric</span>
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
            label="Select Countries"
            options={available.countries || []}
            values={countries}
            onChange={setCountries}
            placeholder="Select countries"
          />
        </div>

        {error ? <div className="data-error">{error}</div> : null}
        {loading ? <div className="data-loading">Loading tax comparison…</div> : null}

        <div className="pricing-chart">
          <div className="chart-labels">
            <span className="chart-label-y">Country</span>
            <span className="chart-label-x">{metricMeta.label}</span>
          </div>
          {chartRows.length ? (
            <div className="bar-chart">
              {chartRows.map((row) => (
                <div key={row.country} className="bar-row">
                  <span className="bar-label">{row.country}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(row.value / (chartMax || 1)) * 100}%`,
                        background: "linear-gradient(180deg, #6ecb47, #3aa43d)",
                      }}
                    />
                  </div>
                  <span className="bar-value">
                    {formatNumber(row.value, metricMeta.suffix)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="chart-empty">No data to display.</div>
          )}
        </div>

      </div>
    </section>
  );
}
