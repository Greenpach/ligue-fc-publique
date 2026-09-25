import { addDays, formatShortDate } from "../utils/date";
import "./DateSelector.css";

export default function DateSelector({ selectedDate, onChange }) {
  const prevDate = addDays(selectedDate, -1);
  const nextDate = addDays(selectedDate, 1);

  return (
    <div className="date-selector">
      <button
        type="button"
        className="date-selector__arrow"
        onClick={() => onChange(prevDate)}
        aria-label="Jour precedent"
      >
        ‹
      </button>

      <div className="date-selector__pills">
        <span className="date-selector__pill">{formatShortDate(prevDate)}</span>
        <span className="date-selector__pill date-selector__pill--active">
          {formatShortDate(selectedDate)}
        </span>
        <span className="date-selector__pill">{formatShortDate(nextDate)}</span>
      </div>

      <button
        type="button"
        className="date-selector__arrow"
        onClick={() => onChange(nextDate)}
        aria-label="Jour suivant"
      >
        ›
      </button>
    </div>
  );
}
