import React, { useState } from "react";
import "./SettingsPage.scss";

interface SettingsPageProps {
  userName: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateName: (name: string) => void;
}

// Sidebar and TopBar Components
const Sidebar: React.FC<{
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <h2 className="sidebar__title">Student Planner</h2>
        <nav className="sidebar__nav">
          <button
            onClick={() => onNavigate("dashboard")}
            className="sidebar__nav-item"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => onNavigate("calendar")}
            className="sidebar__nav-item"
          >
            📅 Calendar
          </button>
          <button
            onClick={() => onNavigate("courses")}
            className="sidebar__nav-item"
          >
            📚 Courses
          </button>
          <button
            onClick={() => onNavigate("deadlines")}
            className="sidebar__nav-item"
          >
            📝 Deadlines
          </button>
          <button
            onClick={() => onNavigate("settings")}
            className={`sidebar__nav-item ${
              currentPage === "settings" ? "sidebar__nav-item--active" : ""
            }`}
          >
            ⚙️ Settings
          </button>
        </nav>
        <button onClick={onLogout} className="sidebar__logout-btn">
          👤 Logout
        </button>
      </div>
    </div>
  );
};

const TopBar: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <div className="topbar">
      <div className="topbar__content">
        <h1 className="topbar__title">Settings</h1>
        <div className="topbar__user">
          <span className="topbar__user-name">Welcome back!</span>
        </div>
      </div>
    </div>
  );
};

export function SettingsPage({
  userName,
  onNavigate,
  onLogout,
  onUpdateName,
}: SettingsPageProps) {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState("alex@university.edu");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="settings-page">
      <Sidebar
        currentPage="settings"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="main-content">
        <TopBar userName={userName} />

        <main className="content">
          {/* Header */}
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">
              Manage your account and preferences
            </p>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="success-message">
              <span className="success-message__icon">✓</span>
              <span className="success-message__text">
                Settings saved successfully!
              </span>
            </div>
          )}

          <div className="settings-content">
            {/* Profile Information */}
            <div className="settings-card">
              <div className="settings-card__header">
                <span className="settings-card__icon">👤</span>
                <h2 className="settings-card__title">Profile Information</h2>
              </div>

              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn btn--primary">
                  Save Changes
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="settings-card">
              <div className="settings-card__header">
                <span className="settings-card__icon">🔒</span>
                <h2 className="settings-card__title">Change Password</h2>
              </div>

              <form onSubmit={handleChangePassword} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input"
                  />
                </div>

                <button type="submit" className="btn btn--primary">
                  Update Password
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="settings-card">
              <div className="settings-card__header">
                <span className="settings-card__icon">🔔</span>
                <h2 className="settings-card__title">
                  Notification Preferences
                </h2>
              </div>

              <div className="notification-settings">
                {/* Email Reminders Toggle */}
                <div className="toggle-settings">
                  <div>
                    <div className="toggle-settings__title">
                      Email Reminders
                    </div>
                    <div className="toggle-settings__description">
                      Receive deadline reminders via email
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailReminders(!emailReminders)}
                    className={`toggle-switch ${
                      emailReminders ? "toggle-switch--active" : ""
                    }`}
                  >
                    <div className="toggle-switch__handle" />
                  </button>
                </div>

                {/* Reminder Frequency */}
                {emailReminders && (
                  <div className="form-group">
                    <label className="form-label">Reminder Frequency</label>
                    <select
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(e.target.value)}
                      className="form-select"
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
                  className="btn btn--primary"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Theme Preferences */}
            <div className="settings-card">
              <div className="settings-card__header">
                <span className="settings-card__icon">
                  {theme === "light" ? "☀️" : "🌙"}
                </span>
                <h2 className="settings-card__title">Appearance</h2>
              </div>

              <div className="theme-settings">
                <p className="theme-settings__description">
                  Choose your preferred theme
                </p>

                <div className="theme-options">
                  <button
                    onClick={() => setTheme("light")}
                    className={`theme-option ${
                      theme === "light" ? "theme-option--selected" : ""
                    }`}
                  >
                    <span className="theme-option__icon">☀️</span>
                    <div className="theme-option__title">Light</div>
                    <div className="theme-option__subtitle">Default theme</div>
                  </button>

                  <button
                    onClick={() => setTheme("dark")}
                    className={`theme-option ${
                      theme === "dark" ? "theme-option--selected" : ""
                    }`}
                  >
                    <span className="theme-option__icon">🌙</span>
                    <div className="theme-option__title">Dark</div>
                    <div className="theme-option__subtitle">Coming soon</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="danger-zone">
              <h2 className="danger-zone__title">Danger Zone</h2>
              <p className="danger-zone__description">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button className="btn btn--danger">Delete Account</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
