import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { fetchJson } from "./httpClient";

describe("fetchJson", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("returns parsed payload on success", async () => {
    const payload = { ok: true };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    const result = await fetchJson("/data/test");
    expect(result).toEqual(payload);
  });

  it("normalizes errors for non-ok responses", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Server error",
      json: async () => ({ error: { message: "boom" } }),
    });

    await expect(fetchJson("/data/fail")).rejects.toMatchObject({
      code: "HTTP_500",
    });
  });

  it("times out when the request takes too long", async () => {
    vi.useFakeTimers();
    fetch.mockImplementation((_, options) => {
      return new Promise((_, reject) => {
        options.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      });
    });

    const promise = fetchJson("/data/slow", {}, { timeoutMs: 5 });
    vi.advanceTimersByTime(10);
    await expect(promise).rejects.toMatchObject({ code: "TIMEOUT" });
  });
});
