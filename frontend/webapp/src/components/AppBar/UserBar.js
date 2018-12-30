import React from "react";

export default function UserBar(props) {
  const { user } = props;
  return (
    <div className="user-bar">
      {user === undefined ? (
        <div className="log-sig">
          <span>Login</span>or<span>Signup</span>
        </div>
      ) : (
        <span>{user.name}</span>
      )}
    </div>
  );
}
