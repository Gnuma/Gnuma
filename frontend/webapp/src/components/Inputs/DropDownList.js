import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    return (
      <div style={{ display: "inline" }}>
        <button className="std-drp-btn" type="button" onClick={this.showList}>
          <span className="drp-btn-selected">{this.props.selected.name}</span>
          <span className="clr-p chevron-drp">
            <FontAwesomeIcon icon="chevron-down" />
          </span>
        </button>
        <ul className={"std-dropdown " + (this.state.active ? "" : "hide")}>
          {this.props.list.map(sub => (
            <li
              onClick={() => {
                this.props.select(sub);
                this.hideList();
              }}
            >
              {sub.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default onClickOutside(DropDownList);
