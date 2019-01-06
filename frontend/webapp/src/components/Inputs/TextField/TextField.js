import React, { Component } from "react";
import "./TextField.scss";

export default class TextField extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isFocused: false,
    hasError: false,
    errorMessage: ""
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
          className={this.state.hasError ? "error" : null}
          onFocus={() => {
            this.focusLabel();
          }}
          onBlur={() => {
            this.unfocusLabel();
            if (validators !== undefined) {
              this.checkInput(value, validators);
            }
          }}
        />
        {this.state.hasError ? (
          <span className="error-message">{this.state.errorMessage}</span>
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

  checkInput = (value, validators) => {
    const errorFunctions = validators.functions;
    const errorMessages = validators.warnings;
    let hasError = false;
    for (let i = 0; i < errorFunctions.length; i++) {
      hasError = errorFunctions[i](value);
      if (hasError) {
        this.setState({
          errorMessage: errorMessages[i],
          hasError: true
        });
        hasError = true;
        break;
      }
    }
    if (!hasError) {
      this.setState({
        hasError: false
      });
    }
  };
}
