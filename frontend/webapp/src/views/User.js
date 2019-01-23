import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "./AppBar/AppBar";
import UserAccount from "../components/UserAccount/UserAccount";

function User(props) {
  return (
    <div className="view">
      <AppBar />
      <UserAccount props={props} />
    </div>
  );
}

User.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
