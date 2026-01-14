import React, { useState } from "react";
import "./SignupPage.scss";

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string) => void;
  onNavigate: (page: string) => void;
}

export function SignupPage({ onSignup, onNavigate }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    onSignup(name, email, password);
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-wrapper">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("landing")}
          className="signup-page-back-btn"
        >
          <span className="signup-page-back-btn__icon">←</span>
          Back to home
        </button>

        {/* Signup Card */}
        <div className="signup-page-card">
          {/* Logo */}
          <div className="signup-page-logo">
            <div className="signup-page-logo-icon">📅</div>
          </div>

          <h1 className="signup-page-title">Create Account</h1>
          <p className="signup-page-subtitle">
            Join thousands of organized students
          </p>

          {error && <div className="signup-page-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-page-form">
            {/* Name Field */}
            <div className="signup-page-form-group">
              <label className="signup-page-form-label">Full Name</label>
              <div className="signup-page-input-with-icon">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="signup-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="signup-page-form-group">
              <label className="signup-page-form-label">Email Address</label>
              <div className="signup-page-input-with-icon">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="signup-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="signup-page-form-group">
              <label className="signup-page-form-label">Password</label>
              <div className="signup-page-input-with-icon">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="signup-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="signup-page-form-group">
              <label className="signup-page-form-label">Confirm Password</label>
              <div className="signup-page-input-with-icon">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm the password"
                  className="signup-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="signup-page-btn signup-page-btn--signup"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="signup-page-login-link">
            Already have an account?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="signup-page-login-btn"
            >
              Log In
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <p className="signup-page-terms-info">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
