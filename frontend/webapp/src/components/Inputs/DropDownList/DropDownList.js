import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DropDownList.scss";

class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  state = {
    active: false
  };

  handleClickOutside = evt => {
    this.hideList();
  };

  showList() {
    this.setState({ active: true });
  }

  hideList() {
    this.setState({ active: false });
  }

  render() {
    const { selected, list, select, style } = this.props;
    let { focused } = this.props;
    if (focused === undefined) {
      focused = false;
    }
    return (
      <div className={style}>
        <button
          className={"drp-btn " + (focused ? "drp-focused" : "")}
          type="button"
          onClick={this.showList}
        >
          <span className="drp-btn-selected">{selected.name}</span>
          <span className="clr-p chevron-drp">
            <FontAwesomeIcon icon="caret-down" />
          </span>
        </button>
        <ul className={"drp-list " + (this.state.active ? "" : "hide")}>
          {list.map(item => (
            <li
              key={item.id}
              onClick={() => {
                select(item);
                this.hideList();
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default onClickOutside(DropDownList);
