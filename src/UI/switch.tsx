"use client";

import * as React from "react";
import "../Styles/globals.scss";

interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  className = "",
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  ...props
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      className={`switch ${checked ? "checked" : ""} ${
        disabled ? "disabled" : ""
      } ${className}`.trim()}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
      disabled={disabled}
      {...props}
    >
      <div className="switch-thumb" />
    </button>
  );
};
