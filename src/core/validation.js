export function asObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value;
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function asString(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

export function asStringArray(value) {
  return asArray(value)
    .map((item) => (item === null || item === undefined ? "" : String(item)))
    .filter(Boolean);
}

export function asNumber(value, fallback = null) {
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

export function asNumberArray(value) {
  return asArray(value)
    .map((item) => asNumber(item, null))
    .filter((item) => item !== null);
}

export function normalizeAvailable(value) {
  const available = asObject(value);
  return {
    countries: asStringArray(available.countries),
    regions: asStringArray(available.regions),
    years: [
      ...new Set(
        asArray(available.years)
          .map((item) => (item === null || item === undefined ? null : String(item)))
          .filter(Boolean)
      ),
    ],
  };
}

export function normalizeRows(value) {
  return asArray(value).filter((row) => row && typeof row === "object");
}
