import PropTypes from "prop-types";

export default function IconCard({ icon, title, text }) {
  return (
    <div className="icon-card">
      <div className="icon-bubble">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

IconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
