import React from "react";
import radioChecked from "../../../media/vectors/radio-checked.svg";
import radioUnchecked from "../../../media/vectors/radio-unchecked.svg";
import "./RadioButton.scss";

export default function RadioButton(props) {
  let { value } = props;
  return (
    <div className="radio-button">
      {value ? (
        <img src={radioChecked} alt="radioChecked" />
      ) : (
        <img src={radioUnchecked} alt="radioUnchecked" />
      )}
    </div>
  );
}
