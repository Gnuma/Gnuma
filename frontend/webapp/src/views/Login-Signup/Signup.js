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
import ShortLogo from "../../media/vectors/ShortLogo.svg";
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
      name:{
        value: "",
        errorMessage: ""
      },
      surname:{
        value: "",
        errorMessage: ""
      },
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
    const { name, surname, uid, pwd, email, confirmPwd } = this.state.fields;
    return (
      <div className="container">
        <div className="divSX">
          <div className="logo">
            <img src={ShortLogo} />
            <span id="Gnuma">Gnuma</span>
          </div>

          <form onSubmit={this.signup} className="center-panel">
          <TextField
              label="Nome"
              onChange={this.handleChange}
              type="text"
              id="name"
              state={name}
            />
            <TextField
              label="Cognome"
              onChange={this.handleChange}
              type="text"
              id="surname"
              state={surname}
            />
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
              label="Conferma Password"
              onChange={this.handleChange}
              type="password"
              id="confirmPwd"
              state={confirmPwd}
            />
            <label  className="condizioni">
              <input type="checkbox" name="condizioni"></input>
              <span className="checkmark"></span>
              <span>Accetto le <a href="https://en.wikipedia.org/wiki/Terms_of_service">condizioni</a></span><br/>
            </label>
            <input  style={{marginTop: 15}} type="submit" className="std-btn" value="Signup" />   
          </form>
          <span>oppure</span>
          <hr className="blueLine" />
          <span><a href="/login">Hai gia un account?</a></span>
        </div>
        <div className="divDX" />
      </div>
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
  name: {
    functions: [isEmpty],
    warnings: ["Inserisci il tuo nome."]
  },
  surname: {
    functions: [isEmpty],
    warnings: ["Inserisci il tuo cognome."]
  },
  uid: {
    functions: [isEmpty],
    warnings: ["Inserisci il nome utente."]
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
