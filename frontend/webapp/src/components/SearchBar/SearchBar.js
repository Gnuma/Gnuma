import React, { Component } from "react";
import "./SearchBar.scss";
import searchLogo from "../../media/vectors/search-lens.svg";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.focusBar = this.focusBar.bind(this);
    this.unfocusBar = this.unfocusBar.bind(this);
  }

  state = {
    isFocused: false
  };

  render() {
    const { isFocused } = this.state;
    const { value, handleChange, active } = this.props;
    return (
      <form className="search-bar">
        <input
          type="text"
          className={
            "search-input " +
            (isFocused ? "focused " : "") +
            (active ? "active " : "")
          }
          onFocus={this.focusBar}
          onBlur={this.unfocusBar}
          onChange={handleChange}
          value={value}
        />
        <button
          type="submit"
          className={
            "search-submit " +
            (isFocused ? "focused " : "") +
            (active ? "active " : "")
          }
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
