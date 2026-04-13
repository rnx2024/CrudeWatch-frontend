import RollingCards from "../../ui/RollingCards";
import SectionHeader from "../../ui/SectionHeader";
import StatCard from "../../ui/StatCard";
import { Icons } from "../../ui/Icons";

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
  {
    title: "World Data",
    text: "Top global insights from the latest snapshot.",
    icon: Icons.globe,
  },
  {
    title: "Geopolitical Timeline",
    text: "Filter events by year to add context.",
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
            CrudeWatch connects market movements with policy buffers and
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
              label="World Data"
              value="Insights"
              trend="World + Asia"
            />
          </div>
        </div>
        <div className="hero-visual">
          <div className="commute-card">
            <svg
              className="commute-svg"
              viewBox="0 0 520 360"
              role="img"
              aria-label="Commuter impact from fuel price hikes"
            >
              <defs>
                <linearGradient id="roadGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2b3440" />
                  <stop offset="100%" stopColor="#1b232d" />
                </linearGradient>
                <linearGradient id="busGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#f4b400" />
                  <stop offset="100%" stopColor="#f6c340" />
                </linearGradient>
                <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#eaf4ff" />
                  <stop offset="100%" stopColor="#f7fbff" />
                </linearGradient>
                <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.15" />
                </filter>
              </defs>

              <rect width="520" height="360" rx="26" fill="url(#skyGrad)" />

              <g className="commute-lines">
                <rect x="40" y="70" width="90" height="6" rx="3" fill="#cfe3ff" />
                <rect x="130" y="92" width="60" height="6" rx="3" fill="#d9e9ff" />
                <rect x="260" y="60" width="90" height="6" rx="3" fill="#cfe3ff" />
                <rect x="330" y="84" width="70" height="6" rx="3" fill="#d9e9ff" />
              </g>

              <g className="scene scene-buildings">
                <rect x="10" y="120" width="70" height="90" rx="8" fill="#c7d2fe" />
                <rect x="90" y="140" width="80" height="70" rx="8" fill="#dbeafe" />
                <rect x="180" y="110" width="60" height="100" rx="8" fill="#bfdbfe" />
                <rect x="250" y="135" width="90" height="75" rx="8" fill="#e0e7ff" />
                <rect x="350" y="105" width="70" height="105" rx="8" fill="#cbd5f5" />
                <rect x="430" y="130" width="70" height="80" rx="8" fill="#dbeafe" />
                <rect x="22" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="40" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="22" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="40" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="108" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="128" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="108" y="175" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="128" y="175" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="196" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="216" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="196" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="216" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="270" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="290" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="270" y="175" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="290" y="175" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="368" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="388" y="135" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="368" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="388" y="155" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="448" y="150" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="468" y="150" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="448" y="170" width="12" height="12" rx="2" fill="#eef2ff" />
                <rect x="468" y="170" width="12" height="12" rx="2" fill="#eef2ff" />
              </g>

              <g className="scene scene-station">
                <rect x="20" y="170" width="120" height="40" rx="8" fill="#fee2e2" />
                <rect x="30" y="178" width="26" height="30" rx="6" fill="#f87171" />
                <rect x="62" y="178" width="50" height="10" rx="4" fill="#fb7185" />
                <rect x="62" y="192" width="50" height="10" rx="4" fill="#fb7185" />
                <rect x="76" y="152" width="56" height="16" rx="8" fill="#fecaca" />
                <rect x="76" y="152" width="56" height="4" fill="#f97316" />
              </g>

              <g className="scene scene-school">
                <rect x="30" y="165" width="130" height="45" rx="8" fill="#bbf7d0" />
                <rect x="42" y="175" width="26" height="28" rx="4" fill="#86efac" />
                <rect x="74" y="175" width="26" height="28" rx="4" fill="#86efac" />
                <rect x="106" y="175" width="26" height="28" rx="4" fill="#86efac" />
                <rect x="60" y="148" width="70" height="14" rx="6" fill="#4ade80" />
              </g>

              <g className="commute-foreground">
                <rect x="0" y="230" width="520" height="8" fill="#cbd5e1" opacity="0.7" />
                <g fill="#94a3b8">
                  <rect x="60" y="205" width="4" height="30" rx="2" />
                  <rect x="160" y="205" width="4" height="30" rx="2" />
                  <rect x="360" y="205" width="4" height="30" rx="2" />
                  <rect x="460" y="205" width="4" height="30" rx="2" />
                </g>
                <g fill="#86efac">
                  <circle cx="90" cy="225" r="10" />
                  <circle cx="200" cy="225" r="10" />
                  <circle cx="320" cy="225" r="10" />
                  <circle cx="430" cy="225" r="10" />
                </g>
                <g fill="#1f2937">
                  <circle cx="120" cy="222" r="4" />
                  <rect x="118" y="226" width="4" height="10" rx="2" />
                  <circle cx="250" cy="222" r="4" />
                  <rect x="248" y="226" width="4" height="10" rx="2" />
                  <circle cx="395" cy="222" r="4" />
                  <rect x="393" y="226" width="4" height="10" rx="2" />
                </g>
              </g>

              <rect x="0" y="250" width="520" height="70" fill="url(#roadGrad)" />
              <rect x="0" y="240" width="520" height="12" fill="#95a4b8" opacity="0.6" />

              <g className="commute-billboard">
                <rect x="90" y="18" width="340" height="78" rx="6" fill="#e2e8f0" stroke="#cbd5e1" />
                <rect x="98" y="24" width="324" height="66" rx="4" fill="#2f7f2a" stroke="#1f5a1b" />
                <rect x="90" y="90" width="340" height="6" rx="3" fill="#bfc8d6" />
                <rect x="255" y="96" width="10" height="150" rx="5" fill="#9aa5b1" />
                <rect x="230" y="242" width="60" height="10" rx="4" fill="#9aa5b1" />
                <circle cx="118" cy="22" r="3" fill="#b0b8c4" />
                <circle cx="170" cy="22" r="3" fill="#b0b8c4" />
                <circle cx="322" cy="22" r="3" fill="#b0b8c4" />
                <circle cx="402" cy="22" r="3" fill="#b0b8c4" />
                <foreignObject x="110" y="36" width="300" height="48">
                  <div className="billboard-text" xmlns="http://www.w3.org/1999/xhtml">
                    <div className="type-line type-line-1">WE NEED AN OIL PRICE ROLLBACK!</div>
                    <div className="type-line type-line-2">THIS WAR MUST STOP NOW!</div>
                  </div>
                </foreignObject>
              </g>


              <g className="commute-bus">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="-260 0"
                  to="540 0"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <rect x="110" y="160" width="250" height="78" rx="18" fill="url(#busGrad)" />
                <rect x="140" y="175" width="70" height="36" rx="8" fill="#e0f2fe" />
                <rect x="220" y="175" width="70" height="36" rx="8" fill="#e0f2fe" />
                <rect x="300" y="175" width="50" height="36" rx="8" fill="#e0f2fe" />
                <rect x="330" y="195" width="18" height="26" rx="6" fill="#1f2937" />
                <circle cx="160" cy="188" r="7" fill="#f97316" />
                <rect x="154" y="195" width="12" height="12" rx="4" fill="#1f2937" />
                <circle cx="186" cy="190" r="7" fill="#22c55e" />
                <rect x="180" y="197" width="12" height="12" rx="4" fill="#1f2937" />
                <circle cx="240" cy="188" r="7" fill="#60a5fa" />
                <rect x="234" y="195" width="12" height="12" rx="4" fill="#1f2937" />
                <circle cx="268" cy="190" r="7" fill="#f43f5e" />
                <rect x="262" y="197" width="12" height="12" rx="4" fill="#1f2937" />
                <circle cx="320" cy="188" r="7" fill="#fbbf24" />
                <rect x="314" y="195" width="12" height="12" rx="4" fill="#1f2937" />
                <circle cx="155" cy="245" r="20" fill="#111827" />
                <circle cx="310" cy="245" r="20" fill="#111827" />
                <circle cx="155" cy="245" r="10" fill="#e5e7eb" />
                <circle cx="310" cy="245" r="10" fill="#e5e7eb" />
              </g>
            </svg>
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
