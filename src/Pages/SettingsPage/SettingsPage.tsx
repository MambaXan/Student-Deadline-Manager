import React, { useState } from "react";
import "./SettingsPage.scss";
import { Sidebar } from "../../components/Sidebar";
import { MobileNav } from "../../components/MobileNav";

interface SettingsPageProps {
  currentPage: string;
  userName: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateName: (name: string) => void;
}

const TopBar: React.FC<{ userName: string; onMenuClick: () => void }> = ({ 
  userName, 
  onMenuClick 
}) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="settings-page-topbar">
      <div className="settings-page-topbar__content">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="settings-page-topbar__menu-btn" onClick={onMenuClick}>
            ☰
          </button>
          <h1 className="settings-page-topbar__title">Settings</h1>
        </div>
        <div className="settings-page-topbar__user">
          <span className="settings-page-topbar__user-name">
            {greeting}, {userName}!
          </span>
        </div>
      </div>
    </div>
  );
};

export function SettingsPage({
  currentPage,
  userName,
  onNavigate,
  onLogout,
  onUpdateName,
}: SettingsPageProps) {
  const [name, setName] = useState(userName);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(name);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExport = () => {
    const data = {
      courses: JSON.parse(localStorage.getItem("my_courses") || "[]"),
      deadlines: JSON.parse(localStorage.getItem("my_deadlines") || "[]"),
      userName: localStorage.getItem("userName"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `deadlines_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  };

  return (
    <div className="settings-page-container">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />
      <MobileNav 
        currentPage="settings" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <div className="settings-page-main-content">
        <TopBar userName={userName} onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="settings-page-content">
          <div className="settings-page-header">
            <h1 className="settings-page-title">Settings</h1>
            <p className="settings-page-subtitle">Manage your local profile and data</p>
          </div>

          {showSuccess && (
            <div className="settings-page-success-message">
              <span className="settings-page-success-message__icon">✓</span>
              <span className="settings-page-success-message__text">Profile updated!</span>
            </div>
          )}

          <div className="settings-page-content-wrapper">
            {/* Profile Section */}
            <section className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">👤</span>
                <h2 className="settings-page-card__title">Profile</h2>
              </div>
              <form onSubmit={handleSaveProfile} className="settings-page-form">
                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="settings-page-form-input"
                    placeholder="Enter your name"
                  />
                </div>
                <button type="submit" className="settings-page-btn settings-page-btn--primary">
                  Save Changes
                </button>
              </form>
            </section>

            {/* Data Management Section */}
            <section className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">💾</span>
                <h2 className="settings-page-card__title">Data Management</h2>
              </div>
              <p className="settings-page-card__desc">
                Your data is stored locally in this browser. To prevent data loss, we recommend 
                downloading a backup file.
              </p>
              <button onClick={handleExport} className="settings-page-btn settings-page-btn--export">
                📥 Export Data (.json)
              </button>
            </section>

            {/* Logout Section */}
            <section className="settings-page-card settings-page-card--danger">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">🚪</span>
                <h2 className="settings-page-card__title">Session</h2>
              </div>
              <p className="settings-page-card__desc">Log out of your current session on this device.</p>
              <button onClick={onLogout} className="settings-page-btn settings-page-btn--danger">
                Log Out
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}