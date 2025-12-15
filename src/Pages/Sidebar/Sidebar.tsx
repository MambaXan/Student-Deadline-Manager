import React from 'react';
import './Sidebar.scss';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'deadlines', label: 'Deadlines', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="logo-icon">📅</div>
          <span className="logo-text">DeadlineTracker</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="sidebar__nav">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
            >
              <span className="sidebar__nav-icon">{item.icon}</span>
              <span className="sidebar__nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="sidebar__footer">
        <button
          onClick={onLogout}
          className="sidebar__logout-btn"
        >
          <span className="sidebar__logout-icon">👤</span>
          <span className="sidebar__logout-label">Log Out</span>
        </button>
      </div>
    </div>
  );
}