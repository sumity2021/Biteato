import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const PrivateRoute = ({ children, role }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const validate = async () => {
      try {
        let res;
        if (role === "user") {
          res = await axios.get(`${BACKEND_URL}/api/auth/user/validate`, {
            withCredentials: true,
          });
        } else if (role === "partner") {
          res = await axios.get(
            `${BACKEND_URL}/api/auth/food-partner/validate`,
            {
              withCredentials: true,
            }
          );
        }

        if (res?.data?.valid) {
          setAuthorized(true); // user is authorized
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.log(err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, [role]);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
