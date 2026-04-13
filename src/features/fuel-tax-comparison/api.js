import { fetchJson } from "../../core/httpClient";
import { asObject, normalizeAvailable, normalizeRows } from "../../core/validation";

function buildQuery({ region, countries = [] } = {}) {
  const params = new URLSearchParams();
  if (region && region !== "all") {
    params.set("region", region);
  }
  countries.forEach((country) => params.append("country", country));
  return params.toString();
}

function normalizeTaxComparisonResponse(payload) {
  const data = asObject(payload);
  return {
    rows: normalizeRows(data.rows),
    available: normalizeAvailable(data.available),
  };
}

export async function fetchTaxComparison({ region, countries = [] } = {}) {
  const query = buildQuery({ region, countries });
  const payload = await fetchJson(`/data/tax-comparison?${query}`, {}, { timeoutMs: 15000 });
  return normalizeTaxComparisonResponse(payload);
}
