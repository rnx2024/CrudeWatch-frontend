import { fetchJson } from "../../core/httpClient";
import { asObject, normalizeRows } from "../../core/validation";

function normalizeInsights(payload) {
  const data = asObject(payload);
  const world = asObject(data.world);
  const asia = asObject(data.asia);
  return {
    world: {
      low_subsidy: normalizeRows(world.low_subsidy),
      low_income: normalizeRows(world.low_income),
      highest_tax_price: normalizeRows(world.highest_tax_price),
      highest_tax: normalizeRows(world.highest_tax),
    },
    asia: {
      low_subsidy: normalizeRows(asia.low_subsidy),
      low_income: normalizeRows(asia.low_income),
      highest_tax_price: normalizeRows(asia.highest_tax_price),
      highest_tax: normalizeRows(asia.highest_tax),
    },
  };
}

export async function fetchWorldInsights() {
  const payload = await fetchJson("/data/top-insights-global-fuel", {}, { timeoutMs: 15000 });
  return normalizeInsights(payload);
}
