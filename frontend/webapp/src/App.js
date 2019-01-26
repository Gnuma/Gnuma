import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routing/routes";
import * as actions from "./store/actions/auth";
import "./icons";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return <BaseRouter />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
