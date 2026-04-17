import SectionHeader from "../../ui/SectionHeader";

export default function Privacy() {
  return (
    <section className="section about">
      <SectionHeader
        eyebrow="Privacy"
        title="Privacy Policy"
      />

      <div className="about-grid">
        <div className="card">
          <h3>What We Collect</h3>
          <p>
            FuelSignal does not ask for names, emails, accounts, or payments.
            We do not sell personal information.
          </p>
          <p>
            We also use Vercel Analytics (Web Analytics) to understand site
            usage. This provides aggregated insights such as page views,
            referrers, and device information (for example browser and
            operating system), and may include approximate location derived
            from IP address (such as city/country). Vercel states this data is
            anonymized/aggregated and does not rely on third-party cookies.
          </p>
          <p className="privacy-read-link">
            Read{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Vercel Web Analytics Privacy &amp; Compliance
            </a>
            .
          </p>
        </div>
        <div className="card accent">
          <h3>How We Use Data</h3>
          <p>
            We use aggregated datasets and public sources to generate charts,
            comparisons, and insights. We do not profile individuals or track
            users across websites.
          </p>
          <p>
            We use aggregated analytics to understand what pages are most
            useful, improve performance and reliability, and prioritize product
            improvements. We do not use analytics for targeted advertising.
          </p>
        </div>
      </div>
    </section>
  );
}
