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
            FuelTracker does not ask for names, emails, accounts, or payments.
            We do not sell personal information.
          </p>
          <p>
            For security and reliability, our servers may log basic technical
            data such as IP address, user agent, request time, and request ID.
            These logs are used for debugging, rate limiting, and abuse
            prevention.
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
          </p>
        </div>
      </div>
    </section>
  );
}
