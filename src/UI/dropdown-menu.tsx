"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: "left" | "right";
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  trigger,
  align = "left"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Закрытие по клику вне
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
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
    <div className="dropdown-menu" ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`dropdown-content ${align === 'right' ? 'right' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  destructive?: boolean;
}> = ({ className = "", destructive, children, ...props }) => {
  return (
    <button 
      className={`dropdown-item ${destructive ? 'destructive' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export const DropdownMenuCheckboxItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
}> = ({ className = "", checked, children, ...props }) => {
  return (
    <button 
      className={`dropdown-item with-check ${className}`.trim()}
      {...props}
    >
      {checked && (
        <svg className="dropdown-check" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {children}
    </button>
  );
};

export const DropdownMenuSeparator: React.FC = () => {
  return <div className="dropdown-separator" />;
};

export const DropdownMenuLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`dropdown-label ${className}`.trim()} {...props} />;
};

export const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <span className={`dropdown-shortcut ${className}`.trim()} {...props} />;
};