import React from "react";

import "../../styles/auth-shared.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: firstName + " " + lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success("Account created");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="user-register-title"
      >
        <header>
          <h1 id="user-register-title" className="auth-title">
            Create your account
          </h1>
          <p className="auth-subtitle">
            Join to explore and enjoy delicious meals.
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign Up
          </button>
        </form>
        <div className="auth-alt-action">
          Already have an account?{" "}
          <Link to="/user/login">
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
