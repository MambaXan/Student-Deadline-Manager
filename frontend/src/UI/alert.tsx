import * as React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export const Alert: React.FC<AlertProps> = ({ 
  className = "", 
  variant = "default", 
  ...props 
}) => {
  return (
    <div
      role="alert"
      className={`alert alert-${variant} ${className}`.trim()}
      {...props}
    />
  );
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`alert-title ${className}`.trim()} {...props} />;
};

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`alert-description ${className}`.trim()} {...props} />;
};