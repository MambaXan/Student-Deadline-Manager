import React from "react";
import "./LandingPage.scss";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

// Simple image component for fallback
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [hasError, setHasError] = React.useState(false);

  const handleError = () => {
    setHasError(true);
  };

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
      onError={handleError}
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
                className="landing-btn landing-btn--text"
              >
                Log In
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="landing-btn landing-btn--primary"
              >
                Sign Up
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
              Track All Your Deadlines in One Place
            </h1>
            <p className="landing-hero__subtitle">
              Stay organized, never miss a deadline, and manage your university
              coursework with ease. Built by students, for students.
            </p>
            <div className="landing-hero__actions">
              <button
                onClick={() => onNavigate("signup")}
                className="landing-btn landing-btn--hero"
              >
                Get Started Free
                <span className="landing-btn__arrow">→</span>
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="landing-btn landing-btn--secondary"
              >
                Log In
              </button>
            </div>

            {/* Dashboard Preview */}
            <div className="landing-dashboard-preview">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnR8ZW58MXx8fHwxNzY1NTI2ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              Everything You Need to Stay Organized
            </h2>
            <p className="landing-section-subtitle">
              Powerful features designed to help you manage your academic life
              effortlessly
            </p>
          </div>

          <div className="landing-features-grid">
            {/* Feature 1 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--blue">🎯</div>
              <h3 className="landing-feature-title">Dashboard Overview</h3>
              <p className="landing-feature-description">
                Get a clear view of all your upcoming deadlines, overdue tasks,
                and weekly schedule at a glance. Stay on top of everything that
                matters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--green">🔔</div>
              <h3 className="landing-feature-title">Smart Reminders</h3>
              <p className="landing-feature-description">
                Never miss a deadline with customizable email reminders. Get
                notified at the right time, so you're always prepared.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon landing-feature-icon--purple">📚</div>
              <h3 className="landing-feature-title">Course Organizer</h3>
              <p className="landing-feature-description">
                Organize all your courses in one place. Track assignments,
                exams, and projects by course with color-coded labels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="landing-how-it-works">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">How It Works</h2>
          </div>

          <div className="landing-steps-grid">
            <div className="landing-step">
              <div className="landing-step-number">1</div>
              <h3 className="landing-step-title">Create Your Courses</h3>
              <p className="landing-step-description">
                Add all your university courses with instructor names and
                semester information.
              </p>
            </div>

            <div className="landing-step">
              <div className="landing-step-number">2</div>
              <h3 className="landing-step-title">Add Your Deadlines</h3>
              <p className="landing-step-description">
                Input assignments, quizzes, exams, and projects with due dates
                and priorities.
              </p>
            </div>

            <div className="landing-step">
              <div className="landing-step-number">3</div>
              <h3 className="landing-step-title">Stay Organized</h3>
              <p className="landing-step-description">
                View your schedule on the calendar, get reminders, and check off
                completed tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="landing-testimonials">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">What Students Say</h2>
          </div>

          <div className="landing-testimonials-grid">
            <div className="landing-testimonial-card">
              <div className="landing-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="landing-star">
                    ★
                  </span>
                ))}
              </div>
              <p className="landing-testimonial-text">
                "This app completely changed how I manage my coursework. I
                haven't missed a deadline since I started using it!"
              </p>
              <div className="landing-testimonial-author">
                <div className="landing-author-avatar landing-author-avatar--blue">👤</div>
                <div>
                  <div className="landing-author-name">Sarah Johnson</div>
                  <div className="landing-author-role">Computer Science Major</div>
                </div>
              </div>
            </div>

            <div className="landing-testimonial-card">
              <div className="landing-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="landing-star">
                    ★
                  </span>
                ))}
              </div>
              <p className="landing-testimonial-text">
                "Simple, clean, and exactly what I needed. The calendar view
                helps me plan my study schedule perfectly."
              </p>
              <div className="landing-testimonial-author">
                <div className="landing-author-avatar landing-author-avatar--green">👤</div>
                <div>
                  <div className="landing-author-name">Michael Chen</div>
                  <div className="landing-author-role">Engineering Student</div>
                </div>
              </div>
            </div>

            <div className="landing-testimonial-card">
              <div className="landing-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="landing-star">
                    ★
                  </span>
                ))}
              </div>
              <p className="landing-testimonial-text">
                "Love the priority system! I can quickly see which tasks need my
                attention first. Highly recommend!"
              </p>
              <div className="landing-testimonial-author">
                <div className="landing-author-avatar landing-author-avatar--purple">👤</div>
                <div>
                  <div className="landing-author-name">Emma Davis</div>
                  <div className="landing-author-role">Business Major</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-page-footer">
        <div className="landing-container">
          <div className="landing-footer-grid">
            <div className="landing-footer-logo">
              <div className="landing-logo-icon">📅</div>
              <span className="landing-logo-text">DeadlineTracker</span>
              <p className="landing-footer-tagline">
                Helping students stay organized and succeed academically.
              </p>
            </div>

            <div className="landing-footer-column">
              <h4 className="landing-section-title">Product</h4>
              <ul className="landing-footer-links">
                <li>
                  <a href="#" className="landing-footer-link">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="landing-footer-column">
              <h4 className="landing-section-title">Company</h4>
              <ul className="landing-footer-links">
                <li>
                  <a href="#" className="landing-footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="landing-footer-column">
              <h4 className="landing-section-title">Support</h4>
              <ul className="landing-footer-links">
                <li>
                  <a href="#" className="landing-footer-link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="landing-footer-link">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="landing-footer-bottom">
            © 2024 DeadlineTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}