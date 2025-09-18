import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Logout = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const doLogout = async () => {
      try {
        await axios.delete(`${BACKEND_URL}/api/auth/logout`, {
          withCredentials: true,
        });
        toast.success("Logged out successfully");
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Logout failed");
      }
    };

    doLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
