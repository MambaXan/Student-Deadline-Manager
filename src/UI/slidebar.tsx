"use client";

import * as React from "react";
import "../Styles/globals.scss";

interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "onChange"
  > {
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  onChange?: (value: number | number[]) => void;
  onValueChange?: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  className = "",
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  disabled = false,
  onChange,
  onValueChange,
  ...props
}) => {
  const [internalValue, setInternalValue] = React.useState<number | number[]>(
    value !== undefined ? value : defaultValue
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const values = Array.isArray(internalValue) ? internalValue : [internalValue];

  const calculateValue = (clientX: number, clientY: number) => {
    if (!trackRef.current) return min;

    const rect = trackRef.current.getBoundingClientRect();
    let percentage;

    if (orientation === "horizontal") {
      const x = Math.min(Math.max(clientX, rect.left), rect.right);
      percentage = (x - rect.left) / rect.width;
    } else {
      const y = Math.min(Math.max(clientY, rect.top), rect.bottom);
      percentage = 1 - (y - rect.top) / rect.height;
    }

    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(steppedValue, min), max);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled) return;

    const newValue = calculateValue(e.clientX, e.clientY);
    const newValues = values.length === 2 ? [values[0], newValue] : [newValue];

    setInternalValue(values.length === 2 ? newValues : newValue);
    onChange?.(values.length === 2 ? newValue : newValues);
    onValueChange?.(newValues);
  };

  const handleThumbMouseDown = (index: number) => (e: React.MouseEvent) => {
    if (disabled) return;

    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startValues = [...values];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!trackRef.current) return;

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newValue;
      if (orientation === "horizontal") {
        newValue = calculateValue(startX + deltaX, 0);
      } else {
        newValue = calculateValue(0, startY + deltaY);
      }

      const newValues = [...startValues];
      newValues[index] = newValue;

      if (newValues.length === 2) {
        newValues.sort((a, b) => a - b);
      }

      setInternalValue(newValues.length === 1 ? newValues[0] : newValues);
      onChange?.(newValues.length === 1 ? newValues[0] : newValues);
      onValueChange?.(newValues);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const getThumbPosition = (val: number) => {
    const percentage = (val - min) / (max - min);
    return percentage * 100;
  };

  return (
    <div
      className={`slider ${orientation} ${
        disabled ? "disabled" : ""
      } ${className}`.trim()}
      data-orientation={orientation}
      data-disabled={disabled}
      {...props}
    >
      <div
        ref={trackRef}
        className={`slider-track ${orientation}`}
        onClick={handleTrackClick}
      >
        <div
          className={`slider-range ${orientation}`}
          style={
            values.length === 1
              ? orientation === "horizontal"
                ? { width: `${getThumbPosition(values[0])}%` }
                : { height: `${getThumbPosition(values[0])}%` }
              : orientation === "horizontal"
              ? {
                  left: `${getThumbPosition(values[0])}%`,
                  width: `${
                    getThumbPosition(values[1]) - getThumbPosition(values[0])
                  }%`,
                }
              : {
                  bottom: `${getThumbPosition(values[0])}%`,
                  height: `${
                    getThumbPosition(values[1]) - getThumbPosition(values[0])
                  }%`,
                }
          }
        />
      </div>

      {values.map((val, index) => (
        <div
          key={index}
          className="slider-thumb"
          onMouseDown={handleThumbMouseDown(index)}
          style={
            orientation === "horizontal"
              ? {
                  left: `${getThumbPosition(val)}%`,
                  transform: "translateX(-50%)",
                }
              : {
                  bottom: `${getThumbPosition(val)}%`,
                  transform: "translateY(50%)",
                }
          }
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          tabIndex={disabled ? -1 : 0}
        />
      ))}
    </div>
  );
};
