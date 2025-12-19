"use client";

import * as React from "react";
import '../Styles/globals.scss'; // Импорт стилей

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  checked,
  onCheckedChange,
  disabled,
  ...props
}) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <label className={`checkbox-wrapper ${className}`.trim()}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="hidden" // Скрываем нативный input
        {...props}
      />
      <div 
        className="checkbox"
        data-state={isChecked ? "checked" : "unchecked"}
        aria-checked={isChecked}
        aria-disabled={disabled}
      >
        {isChecked && (
          <div className="checkbox-indicator">
            <svg 
              className="checkbox-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>
    </label>
  );
};