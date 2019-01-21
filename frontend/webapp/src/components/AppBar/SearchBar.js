import React, { Component } from "react";
import PropTypes from "prop-types";
import searchLogo from "../../media/vectors/search-lens.svg";
import DropDown from "../Inputs/DropDownList/DropDownList";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.focusBar = this.focusBar.bind(this);
    this.unfocusBar = this.unfocusBar.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  static propTypes = {
    handleChangeQuery: PropTypes.func,
    searchQuery: PropTypes.string
  };

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
    const { handleChangeQuery, searchQuery } = this.props;
    return (
      <form className="appbar-search-bar" onSubmit={this.submitSearch}>
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
          onChange={handleChangeQuery}
          value={searchQuery}
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

  submitSearch(e) {
    e.preventDefault();
    const searchUrl = this.props.searchQuery;
    if (searchUrl) {
      this.props.search(searchUrl, "00012");
    } else {
      this.props.search(null, "00012");
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
}
