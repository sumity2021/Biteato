import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/auth/logout",
          {},
          { withCredentials: true }
        );
        navigate("/"); // redirect to home after logout
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    doLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
