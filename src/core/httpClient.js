import { apiKey, backendUrl } from "./config";
import { isRetryable, normalizeError } from "./errors";

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_RETRY_DELAY_MS = 400;

function buildUrl(path) {
  if (!backendUrl) {
    throw normalizeError({
      code: "CONFIG_MISSING",
      message: "VITE_BACKEND_URL is not configured.",
    });
  }
  const base = backendUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

async function parseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function buildHeaders(options) {
  const headers = apiKey ? { "x-api-key": apiKey } : {};
  if (options.body && !options.headers?.["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return {
    ...headers,
    ...(options.headers || {}),
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson(path, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(buildUrl(path), {
      ...options,
      headers: buildHeaders(options),
      signal: controller.signal,
    });
    const payload = await parseJson(response);
    if (!response.ok) {
      throw normalizeError({
        status: response.status,
        statusText: response.statusText,
        payload,
      });
    }
    return payload;
  } catch (error) {
    if (error?.code) {
      throw error;
    }
    throw normalizeError({ cause: error });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchJson(path, options = {}, config = {}) {
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retries = config.retries ?? 0;
  const retryDelayMs = config.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
  let attempt = 0;
  while (true) {
    try {
      return await requestJson(path, options, timeoutMs);
    } catch (error) {
      if (attempt < retries && isRetryable(error)) {
        attempt += 1;
        await sleep(retryDelayMs * attempt);
        continue;
      }
      throw error;
    }
  }
}
