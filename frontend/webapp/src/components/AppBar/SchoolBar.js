import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import searchLogo from "../../media/vectors/search-lens.svg";

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
    return (
      <div className="school-bar">
        {school === undefined ? (
          <div>
            <button
              className={"std-btn " + (active ? "active" : "")}
              onClick={this.togleActive}
            >
              Seleziona Istituto
            </button>
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
        ) : (
          <span>{school}</span>
        )}
      </div>
    );
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
