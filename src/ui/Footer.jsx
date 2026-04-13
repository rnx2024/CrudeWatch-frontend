export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>FuelTracker</h4>
          <p>
            Data-driven energy intelligence for crude markets and price impact.
          </p>
        </div>
        <div className="footer-links">
          <p className="footer-title">Quick Links</p>
          <div className="footer-links-row">
            <a href="/">Home</a>
            <a href="/fuel-prices">Fuel Prices</a>
            <a href="/pricing-trend">Pricing Trend</a>
            <a href="/fuel-tax-comparison">Fuel Tax</a>
            <a href="/subsidy-tracker">Subsidy Tracker</a>
            <a href="/world-data">World Data</a>
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FuelTracker. All rights reserved.</span>
      </div>
    </footer>
  );
}
