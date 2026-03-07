import * as React from "react";
import "../Styles/globals.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  className = "",
  disabled,
  children,
  ...props
}) => {
  return (
    <label
      className={`label ${disabled ? "disabled" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  );
};
