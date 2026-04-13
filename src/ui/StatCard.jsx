import PropTypes from "prop-types";

export default function StatCard({ label, value, trend }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <h3>{value}</h3>
      <p>{trend}</p>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.string.isRequired,
};
