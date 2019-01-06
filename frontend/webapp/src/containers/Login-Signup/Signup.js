import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Login-Signup.scss";
import TextField from "../../components/Inputs/TextField/TextField";
import {
  isEmpty,
  isInvaildEmail
} from "../../components/Inputs/errorFunctions";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    validators.confirmpwdValidators.functions.push(this.isDifferentPwd);
  }

  static propTypes = {};

  state = {
    uid: {
      value: "",
      error: ""
    },
    email: {
      value: "",
      error: ""
    },
    pwd: {
      value: "",
      error: ""
    },
    confirmPwd: {
      value: "",
      error: ""
    }
  };

  render() {
    const { uid, pwd, email, confirmPwd } = this.state;
    return (
      <form onSubmit={this.signup} className="center-panel">
        <TextField
          label="Nome Utente"
          onChange={this.handleChange}
          type="text"
          value={uid.value}
          id="uid"
          validators={validators.uidValidators}
        />
        <TextField
          label="Email"
          onChange={this.handleChange}
          type="text"
          value={email.value}
          id="email"
          validators={validators.emailValidators}
        />
        <TextField
          label="Password"
          onChange={this.handleChange}
          type="password"
          value={pwd.value}
          id="pwd"
          validators={validators.pwdValidators}
        />
        <TextField
          label="Confirm Password"
          onChange={this.handleChange}
          type="password"
          value={confirmPwd.value}
          id="confirmPwd"
          validators={validators.confirmpwdValidators}
        />
        <input type="submit" className="std-btn" value="Signup" />
      </form>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: {
        value: e.target.value
      }
    });
  }

  signup(e) {
    e.preventDefault();
    
  }

  isDifferentPwd = confirmPwd => {
    const pwd = this.state.pwd;
    console.log(pwd, confirmPwd);
    return pwd !== confirmPwd;
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

let validators = {
  uidValidators: {
    functions: [isEmpty],
    warnings: ["Inserisci il nome."]
  },
  emailValidators: {
    functions: [isEmpty, isInvaildEmail],
    warnings: ["Inserisci l'email.", "L'email non è valida."]
  },
  pwdValidators: {
    functions: [isEmpty],
    warnings: ["Inserisci la password."]
  },
  confirmpwdValidators: {
    functions: [isEmpty],
    warnings: ["Reinserisci la password.", "Le due password non coincidono."]
  }
};
