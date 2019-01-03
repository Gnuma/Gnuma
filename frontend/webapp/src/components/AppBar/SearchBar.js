import React, { Component } from "react";
import searchLogo from "../../media/vectors/search-lens.svg";
import DropDown from "../Inputs/DropDownList/DropDownList";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.focusBar = this.focusBar.bind(this);
    this.unfocusBar = this.unfocusBar.bind(this);
  }

  state = {
    isFocused: false,
    selectedSub: this.props.subList[0],
    subList: this.props.subList
  };

  select(subject) {
    this.setState({ selectedSub: subject });
  }

  render() {
    const { subList, isFocused, selectedSub } = this.state;
    return (
      <form className="search-bar">
        <DropDown
          list={subList}
          selected={selectedSub}
          select={this.select}
          style="appbar-drp-list"
          focused={isFocused}
        />
        <input
          type="text"
          className={
            "search-input " + (isFocused ? "search-input-focused" : "")
          }
          onFocus={this.focusBar}
          onBlur={this.unfocusBar}
        />
        <button
          className={
            "search-submit " + (isFocused ? "search-submit-focused" : "")
          }
          type="submit"
        >
          <img src={searchLogo} alt="search" />
        </button>
      </form>
    );
  }

  focusBar() {
    this.setState({
      isFocused: true
    });
  }

  unfocusBar() {
    this.setState({
      isFocused: false
    });
  }
}
