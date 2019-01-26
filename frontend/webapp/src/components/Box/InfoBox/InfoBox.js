import React from "react";
import "./InfoBox.scss";

export default function InfoBox(props) {
  const { title, children } = props;
  return (
    <div className="info-box">
      <h1 className="xl-title">{title}</h1>
      <div className="box-content">{children}</div>
    </div>
  );
}
