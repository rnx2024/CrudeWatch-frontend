import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="nav-wrapper">
      <nav className="nav">
        <Link to="/" className="brand">
          <img
            className="brand-mark"
            src="/fuelsignal-logo.png"
            alt="FuelSignal logo"
          />
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/fuel-prices">Fuel Prices</NavLink>
          <NavLink to="/fuel-tax-comparison">Fuel Tax</NavLink>
          <NavLink to="/subsidy-tracker">Subsidy Tracker</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
    </header>
  );
}
