import { useEffect, useMemo, useState } from "react";
import { getUserMessage } from "../../core/errors";
import SectionHeader from "../../ui/SectionHeader";
import { fetchWorldInsights } from "./api";

function formatDate(value) {
  if (!value) return "—";
  const str = String(value);
  return str.includes("T") ? str.slice(0, 10) : str;
}

function formatNumber(value, suffix = "") {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return `${num.toFixed(2)}${suffix}`;
}

const panelOptions = [
  { value: "low_subsidy", label: "Low fuel subsidy countries" },
  { value: "low_income", label: "Low income countries" },
  { value: "highest_tax_price", label: "Highest tax prices" },
  { value: "highest_tax", label: "Highest tax countries" },
];

export default function WorldData() {
  const [insights, setInsights] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState("low_subsidy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInsights() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchWorldInsights();
        setInsights(data);
      } catch (err) {
        console.error("World data load failed", err);
        setError(getUserMessage(err, "Failed to load world data."));
      } finally {
        setLoading(false);
      }
    }
    loadInsights();
  }, []);

  const panelMeta = useMemo(
    () => ({
      low_subsidy: {
        title: "Low fuel subsidy countries",
        subtitle: "Countries with the lowest subsidy level in the latest snapshot.",
        valueLabel: "Subsidy level",
        valueKey: "subsidy_level",
        secondaryLabel: "Petrol",
        secondaryKey: "petrol_usd_liter",
        secondarySuffix: " USD/L",
      },
      low_income: {
        title: "Low income countries",
        subtitle: "Lowest income tiers with current petrol pricing.",
        valueLabel: "Income level",
        valueKey: "income_level",
        secondaryLabel: "Petrol",
        secondaryKey: "petrol_usd_liter",
        secondarySuffix: " USD/L",
      },
      highest_tax_price: {
        title: "Highest tax prices",
        subtitle: "Estimated tax component in petrol price (petrol × tax %).",
        valueLabel: "Tax price",
        valueKey: "tax_price_usd_liter",
        valueSuffix: " USD/L",
        secondaryLabel: "Tax rate",
        secondaryKey: "tax_percentage",
        secondarySuffix: "%",
      },
      highest_tax: {
        title: "Highest tax countries",
        subtitle: "Highest tax percentage applied to petrol prices.",
        valueLabel: "Tax rate",
        valueKey: "tax_percentage",
        valueSuffix: "%",
        secondaryLabel: "Petrol",
        secondaryKey: "petrol_usd_liter",
        secondarySuffix: " USD/L",
      },
    }),
    []
  );

  const selectedIndex = panelOptions.findIndex(
    (option) => option.value === selectedPanel
  );
  const selectedMeta = panelMeta[selectedPanel];
  const worldRows = insights?.world?.[selectedPanel] || [];
  const asiaRows = insights?.asia?.[selectedPanel] || [];

  const movePanel = (direction) => {
    const nextIndex =
      (selectedIndex + direction + panelOptions.length) % panelOptions.length;
    setSelectedPanel(panelOptions[nextIndex].value);
  };

  return (
    <section className="section">
      <SectionHeader
        eyebrow="World Data"
        title="Global fuel price insights"
        subtitle="World and Asia rankings."
      />

      {error ? <div className="data-error">{error}</div> : null}
      {loading ? <div className="data-loading">Loading world data…</div> : null}

      <div className="insight-layout single">
        <div className="insight-main">
          {selectedMeta ? (
            <div className="card insight-panel insight-focus">
              <div className="insight-panel-head">
                <div>
                  <h3>{selectedMeta.title}</h3>
                  <p>{selectedMeta.subtitle}</p>
                </div>
                <div className="insight-actions">
                  {insights?.as_of ? (
                    <span className="insight-asof">As of {formatDate(insights.as_of)}</span>
                  ) : null}
                  <button
                    className="scroll-btn"
                    type="button"
                    onClick={() => movePanel(-1)}
                    aria-label="Previous insight"
                  >
                    ←
                  </button>
                  <button
                    className="scroll-btn"
                    type="button"
                    onClick={() => movePanel(1)}
                    aria-label="Next insight"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="insight-panel-grid two-col">
                <div className="insight-panel-card">
                  <h4>World</h4>
                  <div className="insight-stack">
                    {worldRows.map((row) => (
                      <div className="insight-row" key={`world-${row.country}`}>
                        <div>
                          <strong>{row.country}</strong>
                          <span>{row.region}</span>
                        </div>
                        <div className="insight-meta">
                          <span>
                            {selectedMeta.valueLabel}:{" "}
                            {selectedMeta.valueSuffix
                              ? formatNumber(row[selectedMeta.valueKey], selectedMeta.valueSuffix)
                              : row[selectedMeta.valueKey] || "—"}
                          </span>
                          <span>
                            {selectedMeta.secondaryLabel}:{" "}
                            {formatNumber(
                              row[selectedMeta.secondaryKey],
                              selectedMeta.secondarySuffix || ""
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="insight-panel-card">
                  <h4>Asia</h4>
                  <div className="insight-stack">
                    {asiaRows.map((row) => (
                      <div className="insight-row" key={`asia-${row.country}`}>
                        <div>
                          <strong>{row.country}</strong>
                          <span>{row.region}</span>
                        </div>
                        <div className="insight-meta">
                          <span>
                            {selectedMeta.valueLabel}:{" "}
                            {selectedMeta.valueSuffix
                              ? formatNumber(row[selectedMeta.valueKey], selectedMeta.valueSuffix)
                              : row[selectedMeta.valueKey] || "—"}
                          </span>
                          <span>
                            {selectedMeta.secondaryLabel}:{" "}
                            {formatNumber(
                              row[selectedMeta.secondaryKey],
                              selectedMeta.secondarySuffix || ""
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
