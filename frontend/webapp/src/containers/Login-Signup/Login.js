import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "../../components/Inputs/TextField/TextField";
import "./Login-Signup.scss";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {};

  state = {
    uid: "",
    pwd: ""
  };

  render() {
    const { uid, pwd } = this.state;
    return (
      <form onSubmit={this.login} className="center-panel">
        <TextField
          label="Email o nome utente"
          onChange={this.handleChange}
          type="text"
          value={uid}
          id="uid"
        />
        <TextField
          label="Password"
          onChange={this.handleChange}
          value={pwd}
          type="password"
          id="pwd"
        />
        <input type="submit" className="std-btn" value="Signup" />
      </form>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
