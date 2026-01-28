import React from "react";
import "./LandingPage.scss";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className={`landing-fallback-image ${className}`}>
        <div className="landing-fallback-image__icon">📅</div>
        <div className="landing-fallback-image__text">Dashboard Preview</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="landing-page-container">
      {/* Header */}
      <header className="landing-page-header">
        <div className="landing-container">
          <div className="landing-page-header__content">
            <div className="landing-page-header__logo">
              <div className="landing-logo-icon">📅</div>
              <span className="landing-logo-text">DeadlineTracker</span>
            </div>
            <div className="landing-page-header__actions">
              <button
                onClick={() => onNavigate("login")}
                className="landing-btn landing-btn--primary"
              >
                Launch App
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-container">
          <div className="landing-hero__content">
            <h1 className="landing-hero__title">
              Built for students who don’t want to spend time setting up
              productivity systems
            </h1>
            <p className="landing-hero__subtitle">
              The most straightforward way to manage your university life.
              Create an account to sync your deadlines and never miss a
              submission again
            </p>
            <div className="landing-hero__actions">
              <button
                onClick={() => onNavigate("signup")}
                className="landing-btn landing-btn--hero"
              >
                Start Tracking Now
                <span className="landing-btn__arrow">→</span>
              </button>
            </div>

            <div className="landing-dashboard-preview">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000"
                alt="Dashboard preview"
                className="landing-dashboard-preview__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">
              Stay Organized Without the Hassle
            </h2>
          </div>

          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--blue">
                🎯
              </div>
              <h3 className="landing-feature-title">Zero Setup</h3>
              <p className="landing-feature-description">
                Start adding tasks in seconds. Your data is stored right in your
                browser, ready whenever you return.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--green">
                🔒
              </div>
              <h3 className="landing-feature-title">Privacy First</h3>
              <p className="landing-feature-description">
                We don't want your email or your data. Everything stays on your
                device, keeping your academic life private.
              </p>
            </div>

            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--purple">
                📚
              </div>
              <h3 className="landing-feature-title">Course Focused</h3>
              <p className="landing-feature-description">
                Organize assignments by course with ease. Visual priority levels
                help you focus on what's due first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-page-footer">
        <div className="landing-container">
          <div className="landing-footer-bottom" style={{ borderTop: "none" }}>
            © 2026 DeadlineTracker. Built for students.
          </div>
        </div>
      </footer>
    </div>
  );
}
