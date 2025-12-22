import React from "react";
import "./MobileNav.scss";

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({
  currentPage,
  onNavigate,
  onLogout,
  isOpen,
  onClose,
}: MobileNavProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "deadlines", label: "Deadlines", icon: "📝" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "calendar", label: "Calendar", icon: "📅" },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="mobile-nav-overlay" onClick={onClose} />

      {/* Mobile Menu */}
      <div className="mobile-nav">
        {/* Header */}
        <div className="mobile-nav__header">
          <div className="mobile-nav__brand">
            <div className="mobile-nav__logo">📅</div>
            <span className="mobile-nav__title">DeadlineTracker</span>
          </div>
          <button onClick={onClose} className="mobile-nav__close-btn">
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mobile-nav__menu">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`mobile-nav__item ${
                  isActive ? "mobile-nav__item--active" : ""
                }`}
              >
                <span className="mobile-nav__item-icon">{item.icon}</span>
                <span className="mobile-nav__item-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mobile-nav__footer">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="mobile-nav__logout-btn"
          >
            <span className="mobile-nav__logout-icon">👤</span>
            <span className="mobile-nav__logout-label">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
