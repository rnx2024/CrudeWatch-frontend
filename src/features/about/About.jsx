import SectionHeader from "../../ui/SectionHeader";

const sources = [
  "GlobalPetrolPrices.com",
  "fuelprice.ph",
  "World Bank Commodity Markets",
  "US EIA",
  "Macrotrends",
  "IMF Climate Data",
  "IEA World Energy Outlook",
  "Reuters",
  "Al Jazeera",
  "National regulators (OGRA, Moping, NDRC, METI, EPPO, Pertamina)",
];

const kaggleUsers = [
  "Kavya Dhyani",
  "zkskhurram",
  "Muhammad Ammar Tufail",
  "BELBIN BENO R M",
];

export default function About() {
  return (
    <section className="section about">
      <SectionHeader
        eyebrow="About"
        title="What is FuelTracker?"
        subtitle=""
      />

      <div className="about-grid">
        <div className="about-col">
        <div className="card">
          <h3>Mission</h3>
          <p>
              FuelTracker consolidates market and policy datasets for energy insights.
              FuelTracker seeks to provide free information regarding fuel prices,
              trends, pricing, tax and subsidy patterns in Asia and across the
              globe.
          </p>
        </div>
          <div className="card">
            <h3>Primary Sources</h3>
            <ul>
              {sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="about-col">
          <div className="card accent">
            <h3>Datasets Credited to Kaggle Users:</h3>
            <ul>
              {kaggleUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Data Limitation</h3>
            <p>
              Coverage is from 2010 to March 2026 only. Updates depend on data
              availability from the listed sources.
            </p>
            <p>
              The dataset is not complete. While best efforts are being made to
              present more complete data, comparisons and insights are derived
              only from available records and do not claim completeness.
            </p>
          </div>
          <div className="card">
            <h3>Site Developer</h3>
            <p>
              <a
                className="link-icon"
                href="https://www.github.com/rnx2024"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    d="M10.59 13.41a1 1 0 0 1 0-1.41l3.18-3.18a3 3 0 1 1 4.24 4.24l-2.12 2.12a3 3 0 0 1-4.24 0 1 1 0 1 1 1.41-1.41 1 1 0 0 0 1.41 0l2.12-2.12a1 1 0 0 0-1.41-1.41l-3.18 3.18a1 1 0 0 1-1.41 0z"
                    fill="currentColor"
                  />
                  <path
                    d="M13.41 10.59a1 1 0 0 1 0 1.41l-3.18 3.18a3 3 0 1 1-4.24-4.24l2.12-2.12a3 3 0 0 1 4.24 0 1 1 0 1 1-1.41 1.41 1 1 0 0 0-1.41 0l-2.12 2.12a1 1 0 0 0 1.41 1.41l3.18-3.18a1 1 0 0 1 1.41 0z"
                    fill="currentColor"
                  />
                </svg>
                rnx2024
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


