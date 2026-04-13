import PropTypes from "prop-types";

function toMonthValue(label) {
  if (!label) return null;
  const [year, month] = String(label).split("-");
  const y = Number(year);
  const m = Number(month);
  if (!y || !m) return null;
  return Date.UTC(y, m - 1, 1);
}

function buildPath(points, width, height, min, max, labelIndex, maxIndex) {
  if (!points.length) return "";
  const xStep = width / Math.max(maxIndex, 1);
  const span = max - min || 1;
  const ordered = points
    .map((point) => ({
      ...point,
      index: labelIndex.get(point.label),
    }))
    .filter((point) => Number.isFinite(point.index))
    .sort((a, b) => a.index - b.index);
  return ordered
    .map((point, index) => {
      const x = point.index * xStep;
      const y = height - ((point.value - min) / span) * height;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function buildPoints(points, width, height, min, max, labelIndex, maxIndex) {
  if (!points.length) return [];
  const xStep = width / Math.max(maxIndex, 1);
  const span = max - min || 1;
  return points
    .map((point) => ({
      ...point,
      index: labelIndex.get(point.label),
    }))
    .filter((point) => Number.isFinite(point.index))
    .sort((a, b) => a.index - b.index)
    .map((point) => {
      const x = point.index * xStep;
      const y = height - ((point.value - min) / span) * height;
      return { x, y };
    });
}

export default function LineChart({ series, xLabel = "Time", yLabel = "Value" }) {
  if (!series.length) {
    return <div className="chart-empty">No data to display.</div>;
  }

  const width = 520;
  const height = 200;
  const colors = [
    "#1B9E77",
    "#D95F02",
    "#7570B3",
    "#E7298A",
    "#66A61E",
    "#E6AB02",
    "#A6761D",
    "#666666",
    "#386CB0",
    "#F0027F",
    "#BF5B17",
    "#1F78B4",
    "#33A02C",
    "#FB9A99",
    "#E31A1C",
    "#FDBF6F",
    "#6A3D9A",
    "#B15928",
  ];
  const allValues = series.flatMap((line) => line.points.map((point) => point.value));
  const min = allValues.length ? Math.min(...allValues) : 0;
  const max = allValues.length ? Math.max(...allValues) : 0;
  const mid = allValues.length ? min + (max - min) / 2 : 0;
  const allLabels = Array.from(
    new Set(series.flatMap((line) => line.points.map((point) => point.label)))
  )
    .filter(Boolean)
    .sort((a, b) => {
      const aTime = toMonthValue(a);
      const bTime = toMonthValue(b);
      if (!Number.isFinite(aTime) || !Number.isFinite(bTime)) {
        return String(a).localeCompare(String(b));
      }
      return aTime - bTime;
    });
  const labelIndex = new Map(allLabels.map((label, index) => [label, index]));
  const maxIndex = Math.max(allLabels.length - 1, 1);
  const xStep = width / Math.max(maxIndex, 1);
  const axisPoints = series
    .flatMap((line) =>
      line.points
        .map((point) => ({
          label: point.label,
          index: labelIndex.get(point.label),
        }))
        .filter((point) => Number.isFinite(point.index) && point.label)
        .map((point) => ({
          label: point.label,
          x: point.index * xStep,
        }))
    )
    .sort((a, b) => a.x - b.x);
  const showSinglePointHint = axisPoints.length === 1;
  const axisLabels = axisPoints.length
    ? [
        { text: axisPoints[0].label, x: axisPoints[0].x },
        axisPoints.length > 2
          ? {
              text: axisPoints[Math.floor(axisPoints.length / 2)].label,
              x: axisPoints[Math.floor(axisPoints.length / 2)].x,
            }
          : null,
        {
          text: axisPoints[axisPoints.length - 1].label,
          x: axisPoints[axisPoints.length - 1].x,
        },
      ].filter(Boolean)
    : [];

  const span = max - min || 1;
  const yMax = 0;
  const yMid = height / 2;
  const yMin = height;

  return (
    <div className="chart">
      <div className="chart-labels">
        <span className="chart-label-y">{yLabel}</span>
        <span className="chart-label-x">{xLabel}</span>
      </div>
      <div className="chart-body">
        <div className="chart-axis-values">
          <span>{allValues.length ? max.toFixed(2) : "—"}</span>
          <span>{allValues.length ? mid.toFixed(2) : "—"}</span>
          <span>{allValues.length ? min.toFixed(2) : "—"}</span>
        </div>
        <div className="chart-plot">
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1={yMax} x2={width} y2={yMax} stroke="#e2e8f0" strokeDasharray="4 4" />
            <line x1="0" y1={yMid} x2={width} y2={yMid} stroke="#e2e8f0" strokeDasharray="4 4" />
            <line x1="0" y1={yMin} x2={width} y2={yMin} stroke="#e2e8f0" strokeDasharray="4 4" />
            {series.map((line, index) => (
              <path
                key={line.label}
                d={buildPath(line.points, width, height, min, max, labelIndex, maxIndex)}
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
            {series.map((line, index) => {
              const points = buildPoints(
                line.points,
                width,
                height,
                min,
                max,
                labelIndex,
                maxIndex
              );
              return points.map((point, pointIndex) => (
                <circle
                  key={`${line.label}-pt-${pointIndex}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={colors[index % colors.length]}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              ));
            })}
          </svg>
          <div className="chart-axis-overlay">
            {axisLabels.map((label) => (
              <span
                key={`${label.text}-${label.x}`}
                className="chart-axis-label center"
                style={{ left: `${(label.x / width) * 100}%` }}
              >
                {label.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showSinglePointHint ? (
        <div className="chart-hint">Only 1 data point in this range.</div>
      ) : null}
      <div className="chart-legend">
        {series.map((line, index) => (
          <div key={line.label} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: colors[index % colors.length] }}
            />
            {line.label}
          </div>
        ))}
      </div>
    </div>
  );
}

LineChart.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      points: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number.isRequired,
          label: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};
