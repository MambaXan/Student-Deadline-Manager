"use client";

import * as React from "react";
import "../../Styles/globals.scss";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: Record<string, any>) => void;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, ...props }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="form" {...props}>
      {children}
    </form>
  );
};

export const FormItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  return <div className={`form-item ${className}`.trim()} {...props} />;
};

export const FormLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    error?: boolean;
  }
> = ({ className = "", error, children, ...props }) => {
  return (
    <label
      className={`form-label ${error ? "error" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  );
};

export const FormControl: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  return <div className={`form-control ${className}`.trim()} {...props} />;
};

export const FormDescription: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className = "", ...props }) => {
  return <p className={`form-description ${className}`.trim()} {...props} />;
};

export const FormError: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className = "", ...props }) => {
  return <p className={`form-error ${className}`.trim()} {...props} />;
};
