import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="card">
        <h2>Page not found</h2>
        <p>That route doesn’t exist.</p>
        <p>
          <Link to="/">Go back home</Link>
        </p>
      </div>
    </section>
  );
}
