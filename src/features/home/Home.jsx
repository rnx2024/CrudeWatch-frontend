import RollingCards from "../../ui/RollingCards";
import SectionHeader from "../../ui/SectionHeader";
import StatCard from "../../ui/StatCard";
import { Icons } from "../../ui/Icons";
import CommuteHeroSvg from "./CommuteHeroSvg";

const rollingInsights = [
  {
    title: "Fuel Prices",
    text: "Compare petrol, diesel, LPG, crude, and tax signals.",
    icon: Icons.chart,
  },
  {
    title: "Pricing Trend",
    text: "Track monthly movements by country and region.",
    icon: Icons.shield,
  },
  {
    title: "Fuel Tax Comparison",
    text: "Compare tax structures within each region.",
    icon: Icons.pump,
  },
  {
    title: "Subsidy Tracker (Asia)",
    text: "Subsidy status, mechanisms, and recent changes.",
    icon: Icons.radar,
  },
];

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Track crude shocks, pricing pressure and impacts.
          </h1>
          <p>
            FuelSignal connects market movements with policy buffers and
            consumer impact. Monitor volatility, evaluate pass-through, and
            understand where prices hit hardest.
          </p>
          <div className="hero-stats">
            <StatCard
              label="Fuel Prices"
              value="Global coverage"
              trend="Monthly snapshots"
            />
            <StatCard
              label="Pricing Trend"
              value="Country curves"
              trend="Year comparisons"
            />
            <StatCard
              label="Tax & Subsidy Comparison"
              value="Regional gaps"
              trend="Policy contrasts"
            />
          </div>
        </div>
        <div className="hero-visual">
          <div className="commute-card">
            <CommuteHeroSvg />
          </div>
        </div>
      </section>

      <section id="insights" className="rolling-section">
        <SectionHeader
          eyebrow="Insights"
          title="Highlights"
          subtitle=""
        />
        <RollingCards items={rollingInsights} />
      </section>



    </div>
  );
}
