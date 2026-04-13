import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function RollingCards({ items }) {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const [rollingStyle, setRollingStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    if (!trackRef.current || !firstSetRef.current) return;

    const update = () => {
      const firstSetWidth = firstSetRef.current.scrollWidth;
      const gapValue = parseFloat(getComputedStyle(trackRef.current).gap || "0") || 0;
      const distance = firstSetWidth + gapValue;
      const durationSeconds = Math.max(distance / 40, 14);

      setRollingStyle({
        "--rolling-distance": `${distance}px`,
        "--rolling-duration": durationSeconds ? `${durationSeconds}s` : "0s",
      });
      setContainerStyle(
        firstSetWidth
          ? {
              maxWidth: `${firstSetWidth}px`,
              width: "100%",
            }
          : {}
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(trackRef.current);
    observer.observe(firstSetRef.current);

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="rolling" style={containerStyle}>
      <div className="rolling-track" ref={trackRef} style={rollingStyle}>
        <div className="rolling-set" ref={firstSetRef}>
          {items.map((item) => (
            <div className="rolling-card" key={item.title}>
              <div className="rolling-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rolling-set" aria-hidden="true">
          {items.map((item) => (
            <div className="rolling-card" key={`${item.title}-dup`}>
              <div className="rolling-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
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
