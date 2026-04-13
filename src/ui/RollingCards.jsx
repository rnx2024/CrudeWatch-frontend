import PropTypes from "prop-types";

export default function RollingCards({ items }) {
  return (
    <div className="rolling">
      <div className="rolling-track">
        {[...items, ...items].map((item, index) => (
          <div className="rolling-card" key={`${item.title}-${index}`}>
            <div className="rolling-icon">{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RollingCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ).isRequired,
};
