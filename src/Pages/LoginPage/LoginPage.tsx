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
    <div className="login-page">
      <div className="login-container">
        {/* Back Button */}
        <button onClick={() => onNavigate("landing")} className="back-btn">
          <span className="back-btn__icon">←</span>
          Back to home
        </button>

        {/* Login Card */}
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon">📅</div>
          </div>

          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Log in to manage your deadlines</p>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
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
                  placeholder="Enter your password"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <button type="button" className="forgot-password-btn">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn--login">
              Log In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="signup-link">
            Don't have an account?{" "}
            <button onClick={() => onNavigate("signup")} className="signup-btn">
              Sign Up
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
