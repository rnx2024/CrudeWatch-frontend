import { fetchJson } from "../../core/httpClient";
import { asArray, asObject, normalizeAvailable, normalizeRows } from "../../core/validation";

function buildYearRange(years = []) {
  const yearValues = years.map((value) => Number(value)).filter((value) => !Number.isNaN(value));
  if (!yearValues.length) return {};
  const minYear = Math.min(...yearValues);
  const maxYear = Math.max(...yearValues);
  return {
    start: `${minYear}-01-01`,
    end: `${maxYear}-12-31`,
  };
}

function buildQuery({ region, countries = [], years = [] } = {}) {
  const params = new URLSearchParams();
  if (region && region !== "all") {
    params.set("region", region);
  }
  countries.forEach((country) => params.append("country", country));
  const { start, end } = buildYearRange(years);
  if (start && end) {
    params.set("start", start);
    params.set("end", end);
  }
  return params.toString();
}

function normalizeFuelPriceResponse(payload) {
  const data = asObject(payload);
  return {
    rows: normalizeRows(data.rows),
    available: normalizeAvailable(data.available),
  };
}

export async function fetchFuelPrices({ region, countries = [], years = [] } = {}) {
  const query = buildQuery({ region, countries, years });
  const payload = await fetchJson(`/data/fuel-prices?${query}`, {}, { timeoutMs: 15000 });
  return normalizeFuelPriceResponse(payload);
}

export async function fetchFuelPriceOptions({ region, years = [] } = {}) {
  const query = buildQuery({ region, years });
  const payload = await fetchJson(`/data/fuel-prices?${query}`, {}, { timeoutMs: 15000 });
  return normalizeFuelPriceResponse(payload);
}

export async function fetchMetroManilaPricing() {
  const payload = await fetchJson("/data/current-fuel-prices-mm", {}, { timeoutMs: 15000 });
  const data = asObject(payload);
  return {
    as_of: data.as_of || null,
    rows: normalizeRows(data.rows),
  };
}

export function extractRegionCountries(rows = [], region = "all") {
  const set = new Set();
  asArray(rows).forEach((row) => {
    if (!row?.country) return;
    if (region !== "all" && row.region && row.region !== region) return;
    set.add(row.country);
  });
  return Array.from(set).sort();
}
