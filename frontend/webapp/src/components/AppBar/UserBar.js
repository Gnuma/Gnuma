import React from "react";
import { NavLink } from "react-router-dom";

export default function UserBar(props) {
  const { user, isAuthenticated, logout, push } = props;
  return (
    <div className="user-bar">
      <NavLink to="/vendi">
        <span>Vendi</span>
      </NavLink>
      <NavLink to="/zaino">
        <span>Zaino</span>
      </NavLink>
      <NavLink to="/aiuto">
        <span>Aiuto</span>
      </NavLink>

      {!isAuthenticated ? (
        <button className="std-btn" onClick={() => push("login")}>
          Entra in Gnuma
        </button>
      ) : (
        <button className="std-btn" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
}
