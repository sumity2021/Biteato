import React from "react";
import { NavLink, useParams } from "react-router-dom";
import "../styles/bottom-nav.css";
const BottomNavFoodPartner = () => {
  const { id } = useParams();
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">
        <NavLink
          to={`/${id}/create-food`}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* create food icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </span>
          <span className="bottom-nav__label">Create Food</span>
        </NavLink>

        <NavLink
          to={`/me/${id}`}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* profile icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              <path d="M12 14c-4.41 0-8 2.69-8 6v2h16v-2c0-3.31-3.59-6-8-6z" />
            </svg>
          </span>
          <span className="bottom-nav__label">Profile</span>
        </NavLink>
        <NavLink to="/logout" className="bottom-nav__item">
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* logout icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          <span className="bottom-nav__label">Logout</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavFoodPartner;
