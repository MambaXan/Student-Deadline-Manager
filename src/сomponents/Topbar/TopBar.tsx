import React from "react";
import "./TopBar.scss";

interface TopBarProps {
  userName: string;
  onMenuClick?: () => void;
}

export function TopBar({ userName, onMenuClick }: TopBarProps) {
  return (
    <div className="topbar">
      <div className="topbar__content">
        {/* Left Side - Mobile Menu + Greeting */}
        <div className="topbar__left">
          {/* Mobile Menu Button */}
          {onMenuClick && (
            <button onClick={onMenuClick} className="topbar__menu-btn">
              <span className="topbar__menu-icon">☰</span>
            </button>
          )}

          {/* Greeting */}
          <div className="topbar__greeting">
            <h1 className="topbar__title">Welcome back! 👋</h1>
            <p className="topbar__subtitle">
              Here's what's happening with your deadlines today
            </p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="topbar__actions">
          {/* Search Bar - Hidden on mobile */}
          <div className="topbar__search">
            <span className="topbar__search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search deadlines..."
              className="topbar__search-input"
            />
          </div>

          {/* Notifications */}
          <button className="topbar__notification-btn">
            <span className="topbar__notification-icon">🔔</span>
            <span className="topbar__notification-badge"></span>
          </button>

          {/* Profile - Hidden on small mobile */}
          <button className="topbar__profile-btn">
            <div className="topbar__profile-avatar">
              <span className="topbar__profile-icon">👤</span>
            </div>
            <span className="topbar__profile-name">{userName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}