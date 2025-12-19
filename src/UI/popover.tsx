"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface PopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  trigger,
  position = "bottom"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  // Закрытие по клику вне
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="popover" ref={popoverRef}>
      <div className="popover-trigger" onClick={togglePopover}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`popover-content ${position}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export const PopoverTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`popover-trigger ${className}`.trim()} {...props} />;
};

export const PopoverContent: React.FC<React.HTMLAttributes<HTMLDivElement> & {
  position?: "top" | "bottom" | "left" | "right";
}> = ({ 
  className = "", 
  position = "bottom",
  ...props 
}) => {
  return <div className={`popover-content ${position} ${className}`.trim()} {...props} />;
};