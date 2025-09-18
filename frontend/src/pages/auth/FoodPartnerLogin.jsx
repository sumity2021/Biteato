import React from "react";
import "../../styles/auth-shared.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/food-partner/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Signed in");
      navigate(`/${response.data.foodPartner._id}/create-food`);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Check your credentials");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-login-title"
      >
        <header>
          <h1 id="partner-login-title" className="auth-title ">
            Partner login
          </h1>
          <p className="auth-subtitle">
            Access your dashboard and manage orders.
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="auth-alt-action">
          New partner?{" "}
          <Link to="/food-partner/register">
            <span>Create an account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
