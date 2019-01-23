import React, { Component } from "react";
import "./SearchBox.scss";
import SearchBar from "../../SearchBar/SearchBar";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);
    this.boxRef = React.createRef();
  }

  state = {
    isActive: false,
    maxHeight: undefined
  };

  render() {
    const { value, handleChange, id, className, title } = this.props;
    const { isActive, maxHeight } = this.state;
    return (
      <div className={"box " + className}>
        <h1 className="xl-title">{title}</h1>
        <SearchBar
          handleChange={e => {
            handleChange(e, id);
            this.setActive(e);
          }}
          value={value}
          active={isActive}
        />
        <div
          ref={this.boxRef}
          className={"box-content " + (isActive ? "active" : "")}
          style={{ maxHeight: isActive ? maxHeight : 0 }}
        >
          {this.props.children !== undefined ? this.props.children : ""}
        </div>
      </div>
    );
  }

  setActive(e) {
    if (e.target.value) {
      this.setState({
        isActive: true,
        maxHeight: this.boxRef.current.scrollHeight + "px"
      });
    } else {
      this.setState({
        isActive: false
      });
    }
  }
}
