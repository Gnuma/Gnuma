import React from "react";
import "./InfoBar.scss";

export default function InfoBar(props) {
  return (
    <div className="info-bar">
      <span className="info-bar-office">{props.office}</span>
      {props.subjects.map(sub => (
        <span className="info-bar-subject">{sub}</span>
      ))}
    </div>
  );
}
