import React from "react";
import { NavLink } from "react-router-dom";

export default function UserBar(props) {
  const { user, isAuthenticated, logout } = props;
  return (
    <div className="user-bar">
      {!isAuthenticated ? (
        <div className="log-sig">
          <NavLink to="/login">
            <span>Login</span>
          </NavLink>
          or
          <NavLink to="/signup">
            <span>Signup</span>
          </NavLink>
        </div>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}
