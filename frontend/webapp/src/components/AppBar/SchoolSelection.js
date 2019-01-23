import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import searchLogo from "../../media/vectors/search-lens.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SchoolBar extends Component {
  constructor(props) {
    super(props);

    this.togleActive = this.togleActive.bind(this);
  }

  state = {
    active: false
  };

  render() {
    const { school, setSchool } = this.props;
    const { active } = this.state;

    let result = undefined;

    if (school === undefined) {
      result = (
        <div className="school-selection-container">
          <button
            className={"std-btn " + (active ? "active" : "")}
            onClick={this.togleActive}
          >
            Seleziona Istituto
            <FontAwesomeIcon
              icon="caret-down"
              transform={active ? { rotate: 180 } : { rotate: 0 }}
            />
          </button>
          <div
            className={"school-selection-spacer " + (active ? "active" : "")}
          />
          <div className={"school-selection " + (active ? "active" : "")}>
            <form action="">
              <div className="std-search-bar">
                <input
                  type="text"
                  className="search-input "
                  ref={ip => (this.src = ip)}
                />
                <button className="search-submit " type="submit">
                  <img src={searchLogo} alt="search" />
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      result = <span>{school}</span>;
    }

    return result;
  }

  togleActive() {
    this.setState(
      {
        active: !this.state.active
      },
      () => {
        this.src.focus();
      }
    );
  }

  setUnactive() {
    this.setState({
      active: false
    });
  }

  handleClickOutside = evt => {
    this.setUnactive();
  };
}

export default onClickOutside(SchoolBar);
