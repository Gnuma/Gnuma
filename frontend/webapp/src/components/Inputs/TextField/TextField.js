import React, { Component } from "react";
import "./TextField.scss";

export default class TextField extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: false
  };

  render() {
    const { label, onChange, id, type, state } = this.props;
    const { value, errorMessage } = state;
    return (
      <div className="text-field">
        <label
          htmlFor={id}
          className={this.state.isFocused || value ? "active-label" : ""}
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          onChange={onChange}
          value={value}
          className={errorMessage ? "error" : null}
          onFocus={this.focusLabel}
          onBlur={this.unfocusLabel}
        />
        {errorMessage ? (
          <span className="error-message">{errorMessage}</span>
        ) : null}
      </div>
    );
  }

  focusLabel = () => {
    this.setState({
      isFocused: true
    });
  };

  unfocusLabel = () => {
    this.setState({
      isFocused: false
    });
  };
}
