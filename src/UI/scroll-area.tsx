"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ 
  className = "",
  children,
  orientation = "vertical",
  ...props 
}) => {
  return (
    <div className={`scroll-area ${className}`.trim()} {...props}>
      <div className="scroll-viewport">
        {children}
      </div>
      {orientation !== "horizontal" && <ScrollBar orientation="vertical" />}
      {orientation !== "vertical" && <ScrollBar orientation="horizontal" />}
    </div>
  );
};

interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

export const ScrollBar: React.FC<ScrollBarProps> = ({ 
  className = "",
  orientation = "vertical",
  ...props 
}) => {
  return (
    <div 
      className={`scroll-bar ${orientation} ${className}`.trim()}
      {...props}
    >
      <div className="scroll-thumb" />
    </div>
  );
};