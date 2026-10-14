import "./SlideSwitch.css";

/**
 * Selecteur a glissiere : une pastille coloree glisse sous l'option
 * choisie. options = [{ value, label }], value = valeur selectionnee.
 */
export default function SlideSwitch({ options, value, onChange }) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <div
      className="slide-switch"
      role="tablist"
      style={{ "--count": options.length, "--index": activeIndex }}
    >
      <span className="slide-switch__thumb" />

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          className={`slide-switch__option${option.value === value ? " slide-switch__option--active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
