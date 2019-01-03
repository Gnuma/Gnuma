import React from "react";
import "./ListVoice.scss";
import thumbnailTest from "../../media/img/thumbnail-test.png";

export default function ListVoice(props) {
  const { id, name, img, price, authors } = props;
  return (
    <div className="list-voice">
      <div className="voice-info">
        <div className="thumbnail-block">
          <img src={thumbnailTest} alt="thumbnail" />
        </div>
        <div className="info-list">
          <h1 className="m-title">{name}</h1>
          <h1 className="s-subtitle">di {authors}</h1>
          <h1 className="lg-title">EUR {price}</h1>
        </div>
      </div>
    </div>
  );
}
