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
    <div className="signup-page">
      <div className="signup-container">
        {/* Back Button */}
        <button onClick={() => onNavigate("landing")} className="back-btn">
          <span className="back-btn__icon">←</span>
          Back to home
        </button>

        {/* Signup Card */}
        <div className="signup-card">
          {/* Logo */}
          <div className="signup-logo">
            <div className="logo-icon">📅</div>
          </div>

          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">
            Join thousands of organized students
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                {/* <span className="input-icon">👤</span> */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                {/* <span className="input-icon">✉️</span> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                {/* <span className="input-icon">🔒</span> */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                {/* <span className="input-icon">🔒</span> */}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm the password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="btn btn--signup">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="login-link">
            Already have an account?{" "}
            <button onClick={() => onNavigate("login")} className="login-btn">
              Log In
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <p className="terms-info">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
