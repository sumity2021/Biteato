import React from "react";
import { Link } from "react-router-dom";
import "../../styles/choose-register.css";

const ChooseRegister = () => {
  return (
    <div className="auth-page-full">
      <div className="auth-background"></div>
      <main className="auth-hero">
        <div className="auth-hero-content">
          <h1 className="auth-hero-title">Welcome to Biteato</h1>
          <p className="auth-hero-subtitle">
            Connect, explore, and enjoy delicious meals or manage your food
            business with ease.
          </p>
          <div className="auth-hero-buttons">
            <Link to="/user/register" className="auth-hero-button">
              Get Started
            </Link>
            <Link
              to="/food-partner/register"
              className="auth-hero-button secondary"
            >
              Grow Your Business
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChooseRegister;
