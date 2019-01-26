import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextField from "../../components/Inputs/TextField/TextField";
import "./Login-Signup.scss";
import { submit } from "../../components/Inputs/Form/formHelper";
import { isEmpty } from "../../components/Inputs/Form/errorFunctions";
import * as actions from "../../store/actions/auth";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
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
      pwd: {
        value: "",
        errorMessage: ""
      }
    }
  };

  render() {
    if (this.props.isAuthenticated) this.props.history.goBack();
    const { uid, pwd } = this.state.fields;
    return (
      <form onSubmit={this.login} className="view center-panel">
        <TextField
          label="Email o nome utente"
          onChange={this.handleChange}
          type="text"
          state={uid}
          id="uid"
        />
        <TextField
          label="Password"
          onChange={this.handleChange}
          state={pwd}
          type="password"
          id="pwd"
        />
        <input type="submit" className="std-btn" value="Accedi" />
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

  login(e) {
    e.preventDefault();
    const fields = this.state.fields;
    const result = submit(fields, validators);
    if (result === true) {
      //Success
      const username = fields.uid.value;
      const password = fields.pwd.value;
      this.props.login(username, password);
    } else {
      //Fail
      this.setState(prevState => ({
        ...prevState,
        result
      }));
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

const validators = {
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci l'email o il nome utente."]
  },
  pwd: {
    functions: [isEmpty],
    warnings: ["Inserisci la password"]
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
