import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Login-Signup.scss";
import TextField from "../../components/Inputs/TextField/TextField";
import {
  isEmpty,
  isInvaildEmail
} from "../../components/Inputs/Form/errorFunctions";
import { submit } from "../../components/Inputs/Form/formHelper";
import * as actions from "../../store/actions/auth";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.isDifferentPwd = this.isDifferentPwd.bind(this);
  }

  componentDidMount() {
    validators.confirmPwd.functions.push(this.isDifferentPwd);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  state = {
    fields: {
      uid: {
        value: "",
        errorMessage: ""
      },
      email: {
        value: "",
        errorMessage: ""
      },
      pwd: {
        value: "",
        errorMessage: ""
      },
      confirmPwd: {
        value: "",
        errorMessage: ""
      }
    }
  };

  render() {
    if (this.props.isAuthenticated) this.props.history.goBack();
    const { uid, pwd, email, confirmPwd } = this.state.fields;
    return (
      <form onSubmit={this.signup} className="center-panel">
        <TextField
          label="Nome Utente"
          onChange={this.handleChange}
          type="text"
          id="uid"
          state={uid}
        />
        <TextField
          label="Email"
          onChange={this.handleChange}
          type="text"
          id="email"
          state={email}
        />
        <TextField
          label="Password"
          onChange={this.handleChange}
          type="password"
          id="pwd"
          state={pwd}
        />
        <TextField
          label="Confirm Password"
          onChange={this.handleChange}
          type="password"
          id="confirmPwd"
          state={confirmPwd}
        />
        <input type="submit" className="std-btn" value="Signup" />
      </form>
    );
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [id]: {
          ...prevState.fields[id],
          value: value
        }
      }
    }));
  }

  signup(e) {
    e.preventDefault();

    const fields = this.state.fields;
    const username = fields.uid.value;
    const email = fields.email.value;
    const password1 = fields.pwd.value;
    const password2 = fields.confirmPwd.value;

    const result = submit(fields, validators);
    if (result === true) {
      this.props.signup(username, email, password1, password2);
    } else {
      this.setState(prevState => ({
        ...prevState,
        result
      }));
    }
  }

  isDifferentPwd = confirmPwd => {
    const pwd =
      this.state.fields.pwd !== undefined ? this.state.fields.pwd.value : "";
    return pwd !== confirmPwd;
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

let validators = {
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci il nome."]
  },
  email: {
    functions: [isEmpty, isInvaildEmail],
    warnings: ["Inserisci l'email.", "L'email non è valida."]
  },
  pwd: {
    functions: [isEmpty],
    warnings: ["Inserisci la password."]
  },
  confirmPwd: {
    functions: [isEmpty],
    warnings: ["Reinserisci la password.", "Le due password non coincidono."]
  }
};
