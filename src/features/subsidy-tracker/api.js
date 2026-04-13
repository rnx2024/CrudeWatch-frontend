import { fetchJson } from "../../core/httpClient";
import { asObject, normalizeAvailable, normalizeRows } from "../../core/validation";

function buildQuery({ countries = [] } = {}) {
  const params = new URLSearchParams();
  countries.forEach((country) => params.append("country", country));
  return params.toString();
}

function normalizeSubsidyResponse(payload) {
  const data = asObject(payload);
  return {
    rows: normalizeRows(data.rows),
    available: normalizeAvailable(data.available),
  };
}

export async function fetchSubsidyTracker({ countries = [] } = {}) {
  const query = buildQuery({ countries });
  const payload = await fetchJson(`/data/subsidy-tracker-asia?${query}`, {}, { timeoutMs: 15000 });
  return normalizeSubsidyResponse(payload);
}
