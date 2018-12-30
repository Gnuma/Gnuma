import React from "react";

export default function SchoolBar(props) {
  const { school, setSchool } = props;
  return (
    <div className="school-bar">
      {school === undefined ? (
        <button className="std-btn" onClick={setSchool}>
          Seleziona Istituto
        </button>
      ) : (
        <span>{school}</span>
      )}
    </div>
  );
}
