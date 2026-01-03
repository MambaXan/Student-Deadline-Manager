import React, { useState } from "react";
import "./LoginPage.scss";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-page-container">
      <div className="login-page-wrapper">
        {/* Back Button */}
        <button onClick={() => onNavigate("landing")} className="login-page-back-btn">
          <span className="login-page-back-btn__icon">←</span>
          Back to home
        </button>

        {/* Login Card */}
        <div className="login-page-card">
          {/* Logo */}
          <div className="login-page-logo">
            <div className="login-page-logo-icon">📅</div>
          </div>

          <h1 className="login-page-title">Welcome Back</h1>
          <p className="login-page-subtitle">Log in to manage your deadlines</p>

          <form onSubmit={handleSubmit} className="login-page-form">
            {/* Email Field */}
            <div className="login-page-form-group">
              <label className="login-page-form-label">Email Address</label>
              <div className="login-page-input-with-icon">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="login-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-page-form-group">
              <label className="login-page-form-label">Password</label>
              <div className="login-page-input-with-icon">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-page-form-input"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="login-page-forgot-password">
              <button type="button" className="login-page-forgot-password-btn">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-page-btn login-page-btn--login">
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="login-page-signup-link">
            Don't have an account?{" "}
            <button onClick={() => onNavigate("signup")} className="login-page-signup-btn">
              Sign Up
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <p className="login-page-terms-info">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}