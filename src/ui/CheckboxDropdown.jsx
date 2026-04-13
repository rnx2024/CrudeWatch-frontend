import { useEffect, useId, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function CheckboxDropdown({
  label,
  helper,
  options,
  values,
  onChange,
  placeholder = "Select options",
  allowSelectAll = true,
  variant = "compact",
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const controlId = useId();
  const listId = `${controlId}-listbox`;
  const selectedLabel = values.length ? `${values.length} selected` : placeholder;

  const optionList = useMemo(() => options.filter(Boolean), [options]);

  const toggleValue = (value) => {
    if (values.includes(value)) {
      onChange(values.filter((item) => item !== value));
    } else {
      onChange([...values, value]);
    }
  };

  useEffect(() => {
    function handleClick(event) {
      if (!open) return;
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const firstInput = listRef.current?.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  }, [open]);

  const handleListKeyDown = (event) => {
    const inputs = Array.from(listRef.current?.querySelectorAll("input") || []);
    if (!inputs.length) return;
    const currentIndex = inputs.indexOf(document.activeElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = inputs[Math.min(currentIndex + 1, inputs.length - 1)] || inputs[0];
      next.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = inputs[Math.max(currentIndex - 1, 0)] || inputs[0];
      prev.focus();
    }
    if (event.key === "Home") {
      event.preventDefault();
      inputs[0].focus();
    }
    if (event.key === "End") {
      event.preventDefault();
      inputs[inputs.length - 1].focus();
    }
  };

  const isMulti = variant === "multi";
  const fieldClass = isMulti ? "multi-field" : "compact-field";
  const headClass = isMulti ? "multi-head" : "compact-head";
  const labelClass = isMulti ? "multi-label" : "control-label";
  const helperClass = isMulti ? "multi-helper" : "compact-helper";

  return (
    <div className={`${fieldClass} dropdown-wrap${open ? " open" : ""}`} ref={wrapRef}>
      <div className={headClass}>
        <span className={labelClass}>{label}</span>
        {isMulti && helper ? <span className={helperClass}>{helper}</span> : null}
      </div>
      {!isMulti && helper ? <span className={helperClass}>{helper}</span> : null}
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
      >
        {selectedLabel}
        <span aria-hidden="true">▾</span>
      </button>
      {open ? (
        <div className="dropdown-panel">
          <div className="dropdown-actions">
            {allowSelectAll ? (
              <button
                type="button"
                className="btn ghost compact"
                onClick={() => onChange(optionList)}
              >
                Select all
              </button>
            ) : null}
            <button type="button" className="btn ghost compact" onClick={() => onChange([])}>
              Clear
            </button>
          </div>
          <div
            id={listId}
            ref={listRef}
            className="dropdown-list"
            role="listbox"
            aria-multiselectable="true"
            onKeyDown={handleListKeyDown}
            tabIndex={0}
          >
            {optionList.map((option) => {
              const checked = values.includes(option);
              return (
                <label
                  key={option}
                  className="dropdown-option"
                  role="option"
                  aria-selected={checked}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleValue(option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

CheckboxDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  helper: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  allowSelectAll: PropTypes.bool,
  variant: PropTypes.oneOf(["compact", "multi"]),
};
