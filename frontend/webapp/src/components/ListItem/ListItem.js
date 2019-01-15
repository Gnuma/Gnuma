import React, { Component } from "react";
import "./ListItem.scss";
import thumbnailTest from "../../media/img/thumbnail-test.png";
import { Link } from "react-router-dom";

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.focus = this.focus.bind(this);
    this.unfocus = this.unfocus.bind(this);

    this.state = {
      focused: false
    };
  }

  focus() {
    this.setState({
      focused: true
    });
  }

  unfocus() {
    this.setState({
      focused: false
    });
  }

  render() {
    const { id, name, img, price, authors } = this.props;
    return (
      <div className="list-item">
        <div className="item-info">
          <div className="thumbnail-block">
            <Link to={`/view/${id}`}>
              <img
                src={thumbnailTest}
                alt="thumbnail"
                onMouseEnter={this.focus}
                onMouseLeave={this.unfocus}
              />
            </Link>
          </div>
          <div className="info-list">
            <Link to={`/view/${id}`}>
              <h1
                className={"m-title " + (this.state.focused ? "focused" : "")}
                onMouseEnter={this.focus}
                onMouseLeave={this.unfocus}
              >
                {name}
              </h1>
            </Link>
            <h1 className="s-subtitle">di {authors}</h1>
            <Link to={`/view/${id}`}>
              <h1
                className="lg-title"
                onMouseEnter={this.focus}
                onMouseLeave={this.unfocus}
              >
                EUR {price}
              </h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
