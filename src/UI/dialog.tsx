// components/ui/new/DialogSimple.tsx (если нужен простой вариант)
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
// import { XIcon } from "./icons/XIcon";

interface DialogSimpleProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const DialogSimple: React.FC<DialogSimpleProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.classList.add('dialog-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('dialog-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div 
        className={`dialog-overlay ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
      />
      <div className={`dialog-content ${isClosing ? 'closing' : ''}`}>
        {title && (
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
          </div>
        )}
        <div className="dialog-body">{children}</div>
        <button className="dialog-close" onClick={handleClose}>
          {/* <XIcon /> */}
        </button>
      </div>
    </>,
    document.body
  );
};