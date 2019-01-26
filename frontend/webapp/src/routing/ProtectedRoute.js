import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect push to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false
  }
)(ProtectedRoute);
