import React from "react";
import { Link } from "react-router-dom";
import "../../styles/choose-register.css";

const roles = [
  {
    key: "user",
    title: "Explore Meals",
    desc: "Discover nearby food partners, save favorites, and enjoy personalized meal recommendations.",
    to: "/user/register",
    cta: "Get Started",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="role-icon"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M2 21c2.2-4 6-6 10-6s7.8 2 10 6" />
      </svg>
    ),
  },
  {
    key: "partner",
    title: "Grow Your Business",
    desc: "List your dishes, reach new customers, and manage offerings effortlessly with Biteato tools.",
    to: "/food-partner/register",
    cta: "Become a Partner",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="role-icon"
      >
        <path d="M3 3h18v12H3z" />
        <path d="M7 21h10" />
        <path d="M9 15v6" />
        <path d="M15 15v6" />
      </svg>
    ),
  },
];

const ChooseRegister = () => {
  return (
    <div className="choose-landing">
      <div className="bg-glow" aria-hidden="true" />
      <header className="hero">
        <div className="hero-inner fade-in-up" style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              fontFamily: "'Poppins','Inter',sans-serif",
              letterSpacing: ".5px",
              textTransform: "lowercase",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)",
              color: "#fff",
              borderRadius: "999px",
              padding: ".55rem 1.25rem .65rem",
              display: "inline-block",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 14px -4px rgba(139,92,246,.5)",
            }}
          >
            biteato
          </div>
          <h1 className="hero-title">
            <span className="gradient-text">Food Connections</span> Reimagined
          </h1>
          <p className="hero-sub">
            A modern bridge between hungry people & passionate food creators.
          </p>
          <div className="quick-actions">
            <Link
              to="/user/login"
              className="btn btn-sm btn-pill btn-login-cta"
              aria-label="Login to your account"
            >
              <span className="btn-content">
                <svg
                  className="btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </span>
            </Link>
            <Link
              to="/user/register"
              className="btn btn-primary btn-pill btn-sm"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      <main className="role-section fade-in">
        <h2 className="visually-hidden">Choose your journey</h2>
        <div className="role-grid">
          {roles.map((r) => (
            <div className="role-card card card-hover-lift" key={r.key}>
              <div className="role-icon-wrap">{r.icon}</div>
              <h3 className="role-title">{r.title}</h3>
              <p className="role-desc">{r.desc}</p>
              <Link to={r.to} className="btn btn-primary btn-pill role-cta">
                {r.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="landing-footer text-dim">
        <span>
          © {new Date().getFullYear()} Biteato • Crafted for better taste
          journeys
        </span>
      </footer>
    </div>
  );
};

export default ChooseRegister;
