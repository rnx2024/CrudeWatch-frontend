import { useEffect, useMemo, useState } from "react";
import { getUserMessage } from "../../core/errors";
import CheckboxDropdown from "../../ui/CheckboxDropdown";
import DataNotice from "../../ui/DataNotice";
import SectionHeader from "../../ui/SectionHeader";
import { fetchSubsidyTracker } from "./api";


function formatNumber(value, suffix = "") {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return `${num.toFixed(2)}${suffix}`;
}

function formatLastPriceChange(value) {
  if (value === null || value === undefined || value === "") return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `${num > 0 ? "+" : ""}${num.toFixed(2)} USD/L`;
}

function formatBoolean(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === 1) return "Yes";
  if (value === 0) return "No";
  return value ? String(value) : "—";
}

export default function SubsidyTracker() {
  const [rows, setRows] = useState([]);
  const [available, setAvailable] = useState({ countries: [] });
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchSubsidyTracker();
        setRows(response.rows);
        setAvailable(response.available);
        const defaults = response.available.countries.slice(0, 6) || [];
        setCountries(defaults);
      } catch (err) {
        console.error("Subsidy tracker load failed", err);
        setError(getUserMessage(err, "Failed to load subsidy tracker."));
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  useEffect(() => {
    async function loadFiltered() {
      if (!countries.length) return;
      setLoading(true);
      setError("");
      try {
        const response = await fetchSubsidyTracker({ countries });
        setRows(response.rows);
      } catch (err) {
        console.error("Subsidy tracker filter load failed", err);
        setError(getUserMessage(err, "Failed to load subsidy tracker."));
      } finally {
        setLoading(false);
      }
    }
    loadFiltered();
  }, [countries]);

  const chartRows = useMemo(() => {
    return rows
      .map((row) => ({
        country: row.country,
        value: Number(row.annual_subsidy_cost_bn_usd),
      }))
      .filter((row) => row.country && !Number.isNaN(row.value))
      .sort((a, b) => b.value - a.value);
  }, [rows]);

  const chartMax = useMemo(() => {
    if (!chartRows.length) return 0;
    return Math.max(...chartRows.map((row) => row.value));
  }, [chartRows]);

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Subsidy Tracker (Asia)"
        title="Compare subsidy status and mechanisms"
        subtitle="Select one or more countries to review subsidy details."
      />
      <DataNotice />

      <div className="pricing-panel">
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
        {loading ? <div className="data-loading">Loading subsidy tracker…</div> : null}

        <div className="pricing-chart">
          <div className="chart-labels">
            <span className="chart-label-y">Country</span>
            <span className="chart-label-x">Annual subsidy cost (USD bn)</span>
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
                    {formatNumber(row.value, " bn")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="chart-empty">No data to display.</div>
          )}
        </div>

        <div className="pricing-snapshot-grid">
          {rows.map((row) => (
            <div key={row.country} className="pricing-snapshot-card subsidy-card">
              <div className="subsidy-card-grid">
                <div className="subsidy-summary">
                  <div className="snapshot-head">
                    <div>
                      <strong className="subsidy-country">{row.country}</strong>
                      <span>{row.iso3 || "Asia"}</span>
                    </div>
                  </div>
                  <div className="snapshot-metrics">
                    <div className="snapshot-metric">
                      <span>Gasoline subsidized</span>
                      <strong>{formatBoolean(row.gasoline_subsidized)}</strong>
                    </div>
                    <div className="snapshot-metric">
                      <span>Diesel subsidized</span>
                      <strong>{formatBoolean(row.diesel_subsidized)}</strong>
                    </div>
                    <div className="snapshot-metric">
                      <span>Subsidy type</span>
                      <strong>{row.subsidy_type || "—"}</strong>
                    </div>
                    <div className="snapshot-metric">
                      <span>Annual subsidy cost</span>
                      <strong className="subsidy-figure">
                        {formatNumber(row.annual_subsidy_cost_bn_usd, " bn")}
                      </strong>
                    </div>
                    <div className="snapshot-metric">
                      <span>Subsidy (% GDP)</span>
                      <strong className="subsidy-figure">
                        {formatNumber(row.subsidy_pct_gdp, "%")}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="subsidy-details">
                  <div className="snapshot-subtitle">Subsidy details</div>
                  <div className="snapshot-metric">
                    <span>Description</span>
                    <strong>{row.subsidy_description || "—"}</strong>
                  </div>
                  <div className="snapshot-metric">
                    <span>Last price change</span>
                    <strong>{formatLastPriceChange(row.last_price_change)}</strong>
                  </div>
                  <div className="snapshot-metric">
                    <span>Pricing mechanism</span>
                    <strong>{row.pricing_mechanism || "—"}</strong>
                  </div>
                  <div className="snapshot-metric">
                    <span>Regulator</span>
                    <strong>{row.regulator || "—"}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
