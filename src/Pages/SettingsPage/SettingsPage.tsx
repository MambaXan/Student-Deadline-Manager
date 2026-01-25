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

// TopBar Component
const TopBar: React.FC<{ userName: string }> = ({ userName }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="settings-page-topbar">
      <div className="settings-page-topbar__content">
        <h1 className="settings-page-topbar__title">Settings</h1>
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
  const [email, setEmail] = useState("example@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [emailReminders, setEmailReminders] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState("1-day");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(name);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveNotifications = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="settings-page-container">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <MobileNav
        currentPage="settings"
        onNavigate={onNavigate}
        onLogout={onLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="settings-page-main-content">
        <div className="settings-page-topbar">
          <div className="settings-page-topbar__content">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                className="settings-page-topbar__menu-btn"
                onClick={() => setMobileMenuOpen(true)}
              >
                ☰
              </button>
              <h1 className="settings-page-topbar__title">Settings</h1>
            </div>
            <div className="settings-page-topbar__user">
              <span className="settings-page-topbar__user-name">
                Welcome {userName}!
              </span>
            </div>
          </div>
        </div>

        <main className="settings-page-content">
          {/* Header */}
          <div className="settings-page-header">
            <h1 className="settings-page-title">Settings</h1>
            <p className="settings-page-subtitle">
              Manage your account and preferences
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="settings-page-success-message">
              <span className="settings-page-success-message__icon">✓</span>
              <span className="settings-page-success-message__text">
                Settings saved successfully!
              </span>
            </div>
          )}

          <div className="settings-page-content-wrapper">
            {/* Profile Information */}
            <div className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">👤</span>
                <h2 className="settings-page-card__title">
                  Profile Information
                </h2>
              </div>

              <form onSubmit={handleSaveProfile} className="settings-page-form">
                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="settings-page-form-input"
                  />
                </div>

                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="settings-page-form-input"
                  />
                </div>

                <button
                  type="submit"
                  className="settings-page-btn settings-page-btn--primary"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">🔒</span>
                <h2 className="settings-page-card__title">Change Password</h2>
              </div>

              <form
                onSubmit={handleChangePassword}
                className="settings-page-form"
              >
                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="settings-page-form-input"
                  />
                </div>

                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="settings-page-form-input"
                  />
                </div>

                <div className="settings-page-form-group">
                  <label className="settings-page-form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="settings-page-form-input"
                  />
                </div>

                <button
                  type="submit"
                  className="settings-page-btn settings-page-btn--primary"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">🔔</span>
                <h2 className="settings-page-card__title">
                  Notification Preferences
                </h2>
              </div>

              <div className="settings-page-notification-settings">
                {/* Email Reminders Toggle */}
                <div className="settings-page-toggle-settings">
                  <div>
                    <div className="settings-page-toggle-settings__title">
                      Email Reminders
                    </div>
                    <div className="settings-page-toggle-settings__description">
                      Receive deadline reminders via email
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailReminders(!emailReminders)}
                    className={`settings-page-toggle-switch ${
                      emailReminders
                        ? "settings-page-toggle-switch--active"
                        : ""
                    }`}
                  >
                    <div className="settings-page-toggle-switch__handle" />
                  </button>
                </div>

                {/* Reminder Frequency */}
                {emailReminders && (
                  <div className="settings-page-form-group">
                    <label className="settings-page-form-label">
                      Reminder Frequency
                    </label>
                    <select
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(e.target.value)}
                      className="settings-page-form-select"
                    >
                      <option value="same-day">Same day</option>
                      <option value="1-day">1 day before</option>
                      <option value="2-days">2 days before</option>
                      <option value="1-week">1 week before</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={handleSaveNotifications}
                  className="settings-page-btn settings-page-btn--primary"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Theme Preferences */}
            <div className="settings-page-card">
              <div className="settings-page-card__header">
                <span className="settings-page-card__icon">
                  {theme === "light" ? "☀️" : "🌙"}
                </span>
                <h2 className="settings-page-card__title">Appearance</h2>
              </div>

              <div className="settings-page-theme-settings">
                <p className="settings-page-theme-settings__description">
                  Choose your preferred theme
                </p>

                <div className="settings-page-theme-options">
                  <button
                    onClick={() => setTheme("light")}
                    className={`settings-page-theme-option ${
                      theme === "light"
                        ? "settings-page-theme-option--selected"
                        : ""
                    }`}
                  >
                    <span className="settings-page-theme-option__icon">☀️</span>
                    <div className="settings-page-theme-option__title">
                      Light
                    </div>
                    <div className="settings-page-theme-option__subtitle">
                      Default theme
                    </div>
                  </button>

                  <button
                    onClick={() => setTheme("dark")}
                    className={`settings-page-theme-option ${
                      theme === "dark"
                        ? "settings-page-theme-option--selected"
                        : ""
                    }`}
                  >
                    <span className="settings-page-theme-option__icon">🌙</span>
                    <div className="settings-page-theme-option__title">
                      Dark
                    </div>
                    <div className="settings-page-theme-option__subtitle">
                      Coming soon
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="settings-page-danger-zone">
              <h2 className="settings-page-danger-zone__title">Danger Zone</h2>
              <p className="settings-page-danger-zone__description">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button className="settings-page-btn settings-page-btn--danger">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
