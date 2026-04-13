import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import PricingTrend from "./PricingTrend";

describe("PricingTrend", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders and loads data", async () => {
    const payload = {
      available: {
        countries: ["Algeria"],
        regions: ["Asia"],
        years: [2024, 2025, 2026],
      },
      rows: [
        {
          country: "Algeria",
          region: "Asia",
          date: "2024-01-01",
          petrol_usd_liter: 1.2,
          diesel_usd_liter: 1.1,
          lpg_usd_liter: 0.9,
          brent_crude_usd: 80,
          tax_percentage: 10,
        },
      ],
    };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => payload,
    });

    render(<PricingTrend />);

    expect(
      screen.getByText("Monthly price trends by country")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
