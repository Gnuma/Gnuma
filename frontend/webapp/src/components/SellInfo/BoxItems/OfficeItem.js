import React from "react";
import RadioButton from "../../Inputs/RadioButton/RadioButton";
import radioChecked from "../../../media/vectors/check-mark.svg";

export default function OfficeItem(props) {
  const { isSelected, select, id, office } = props;
  return (
    <div className="office-container" onClick={() => select(id, office)}>
      <div className="office-info">
        <h1 className="m-title l-regular info-title">{office.name}</h1>
        <h1 className="xs-l-info clr-p ">{office.address}</h1>
      </div>
      <RadioButton
        checkedImg={radioChecked}
        value={isSelected}
        width="26px"
        height="26px"
      />
    </div>
  );
}
