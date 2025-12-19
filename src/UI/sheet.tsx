"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  side = "right",
  showCloseButton = true,
  children
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Закрытие по Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      <div className="sheet-overlay" onClick={handleOverlayClick} />
      <div className={`sheet-content sheet-${side}`}>
        {showCloseButton && (
          <button className="sheet-close" onClick={onClose} aria-label="Close">
            <svg className="sheet-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </>
  );
};

export const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sheet-header ${className}`.trim()} {...props} />;
};

export const SheetBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sheet-body ${className}`.trim()} {...props} />;
};

export const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sheet-footer ${className}`.trim()} {...props} />;
};

export const SheetTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <h2 className={`sheet-title ${className}`.trim()} {...props} />;
};

export const SheetDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <p className={`sheet-description ${className}`.trim()} {...props} />;
};