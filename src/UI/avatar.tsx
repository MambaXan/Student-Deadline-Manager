// components/ui/new/AvatarSimple.tsx
import * as React from "react";

export const Avatar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return (
    <div
      className={`avatar ${className}`.trim()}
      {...props}
    />
  );
};

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return (
    <img
      className={`avatar-image ${className}`.trim()}
      {...props}
    />
  );
};

export const AvatarFallback: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return (
    <div
      className={`avatar-fallback ${className}`.trim()}
      {...props}
    />
  );
};