"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  className = "",
  options,
  label,
  error,
  disabled,
  ...props
}) => {
  const selectId = React.useId();

  return (
    <div className={`select ${className}`.trim()}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={`select-trigger ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`.trim()}
        disabled={disabled}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && <div className="form-error">{error}</div>}
      
      {/* Иконка стрелки */}
      <svg 
        className="select-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
};