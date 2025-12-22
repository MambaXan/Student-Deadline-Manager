import * as React from "react";
import "../Styles/globals.scss";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export const CalendarSimple: React.FC<CalendarProps> = ({
  value = new Date(),
  onChange,
}) => {
  return (
    <input
      type="date"
      value={value.toISOString().split("T")[0]}
      onChange={(e) => onChange?.(new Date(e.target.value))}
      className="calendar-input"
    />
  );
};
