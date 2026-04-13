const DEFAULT_USER_MESSAGE = "Unable to load data. Please try again.";

const STATUS_MESSAGES = {
  400: "Invalid request. Please try again.",
  401: "You are not authorized to perform this action.",
  403: "You do not have access to this resource.",
  404: "Requested data was not found.",
  408: "Request timed out. Please try again.",
  429: "Too many requests. Please try again shortly.",
  500: "Server error. Please try again later.",
  502: "Server error. Please try again later.",
  503: "Service unavailable. Please try again later.",
  504: "Server timeout. Please try again later.",
};

export function createError({ code, message, details, cause }) {
  return {
    code: code || "UNKNOWN",
    message: message || DEFAULT_USER_MESSAGE,
    details,
    cause,
  };
}

export function normalizeError({ status, statusText, payload, cause, message, code }) {
  if (code) {
    return createError({ code, message, details: payload, cause });
  }
  if (typeof status === "number") {
    const safeMessage = message || STATUS_MESSAGES[status] || DEFAULT_USER_MESSAGE;
    return createError({
      code: `HTTP_${status}`,
      message: safeMessage,
      details: {
        status,
        statusText,
        payload,
      },
      cause,
    });
  }
  if (cause && cause.name === "AbortError") {
    return createError({
      code: "TIMEOUT",
      message: STATUS_MESSAGES[408],
      cause,
    });
  }
  return createError({
    code: "NETWORK_ERROR",
    message: message || "Network error. Please check your connection.",
    cause,
  });
}

export function getUserMessage(error, fallback = DEFAULT_USER_MESSAGE) {
  if (error?.code === "CONFIG_MISSING") {
    return "Service is not available. Please try again later.";
  }
  if (error && typeof error.message === "string") {
    return error.message;
  }
  return fallback;
}

export function isRetryable(error) {
  if (!error || typeof error.code !== "string") return false;
  if (error.code === "NETWORK_ERROR" || error.code === "TIMEOUT") return true;
  return error.code.startsWith("HTTP_5");
}
