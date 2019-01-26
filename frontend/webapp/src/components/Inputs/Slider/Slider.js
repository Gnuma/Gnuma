import React, { Component } from "react";
import nullImg from "../../../media/img/null-img.png";
import "./Slider.scss";

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
  }

  state = {
    value: 5,
    min: 0,
    max: 10,
    isMoving: false,
    startingPos: 0
  };

  componentDidMount() {
    const img = new Image();
    img.src = nullImg;
    img.onload = () => this.setState({ dragImg: img });
  }

  render() {
    return (
      <div className="slider">
        <span
          draggable="true"
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          onDrag={this.onDrag}
        />
      </div>
    );
  }

  onDragStart(e) {
    e.target.classList.add("dragging");
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setDragImage(this.state.dragImg, 0, 0);

  }

  onDragEnd(e) {
    e.target.classList.remove("dragging");
  }

  onDrag(e) {
    console.log(e.pageX);
    e.target.style.left = e.pageX;
  }
}
