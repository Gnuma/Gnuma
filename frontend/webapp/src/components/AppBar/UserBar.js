import React from "react";
import { NavLink } from "react-router-dom";

export default function UserBar(props) {
  const { user } = props;
  return (
    <div className="user-bar">
      {user === undefined ? (
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
        <span>{user.name}</span>
      )}
    </div>
  );
}
