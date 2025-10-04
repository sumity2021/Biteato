import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/auth-shared.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Read token from query parameter
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!token) {
      return toast.error("Invalid or missing token");
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/change-password`,
        {
          token,
          newPassword,
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to change password");
      console.error("There was an error!", error);
    }
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h2 className="auth-title">Change Password</h2>
          <p className="auth-subtitle">Enter your new password below</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              Passwords do not match
            </div>
          )}
          <button className="auth-submit" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
