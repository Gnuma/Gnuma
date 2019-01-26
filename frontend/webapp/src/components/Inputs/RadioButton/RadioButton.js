import React from "react";
import radioChecked from "../../../media/vectors/radio-checked.svg";
import radioUnchecked from "../../../media/vectors/radio-unchecked.svg";
import "./RadioButton.scss";

export default function RadioButton(props) {
  let { value, checkedImg, uncheckedImg, width, height } = props;
  if (checkedImg === undefined) checkedImg = radioChecked;
  if (uncheckedImg === undefined) uncheckedImg = radioUnchecked;
  if (width === undefined) width = "14px";
  if (height === undefined) height = "14px";

  return (
    <div className="radio-button">
      {value ? (
        <img
          src={checkedImg}
          alt="radioChecked"
          width={width}
          height={height}
        />
      ) : (
        <img
          src={uncheckedImg}
          alt="radioUnchecked"
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
