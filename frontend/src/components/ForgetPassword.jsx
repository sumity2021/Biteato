import { React, useState } from "react";
import "../styles/auth-shared.css";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ForgetPassword = ({ userType }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    try {
      await axios.post(`${BACKEND_URL}/api/auth/forget-password/${userType}`, {
        email,
      });
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link");
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">
            Enter your email to receive a password reset link
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="auth-submit" type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
