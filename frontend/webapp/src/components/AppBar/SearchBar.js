import React, { Component } from "react";
import searchLogo from "../../media/vectors/search-lens.svg";
import DropDown from "../Inputs/DropDownList/DropDownList";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.focusBar = this.focusBar.bind(this);
    this.unfocusBar = this.unfocusBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  state = {
    isFocused: false,
    selectedSub: this.props.subList[0],
    subList: this.props.subList,
    value: this.props.searchQuery !== undefined ? this.props.searchQuery : ""
  };

  select(subject) {
    this.setState({ selectedSub: subject });
  }

  render() {
    const { subList, isFocused, selectedSub, value } = this.state;
    return (
      <form className="search-bar" onSubmit={this.search}>
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
          onChange={this.handleChange}
          value={value}
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

  search(e) {
    e.preventDefault();
    const searchUrl = this.state.value;
    if (searchUrl) {
      this.props.search(searchUrl, "00012");
    } else {
      this.props.search("", "00012");
    }
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

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
}
