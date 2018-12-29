import React, { Component } from "react";
import searchLogo from "../media/vectors/search-lens.svg";
import DropDown from "./Inputs/DropDownList";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
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
        <DropDown list={subList} selected={selectedSub} select={this.select} />
        <input type="text" className="search-input " />
        <button className="search-submit " type="submit">
          <img src={searchLogo} alt="search" />
        </button>
      </form>
    );
  }
}
