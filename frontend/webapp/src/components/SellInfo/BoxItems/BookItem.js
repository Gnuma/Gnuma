import React from "react";
import testImg from "../../../media/img/thumbnail-test.png";
import RadioButton from "../../Inputs/RadioButton/RadioButton";
import radioChecked from "../../../media/vectors/check-mark.svg";

export default function BookItem(props) {
  const { isSelected, select, id, book } = props;
  return (
    <div className="book-container" onClick={() => select(id, book)}>
      <img src={testImg} alt="book" />
      <div className="book-info">
        <h1 className="m-title l-regular info-title">Matematica Verde</h1>
        <h1 className="s-subtitle">di pippe a peppe</h1>
        <h1 className="lg-title l-regular">EUR 26,00</h1>
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
