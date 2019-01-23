import React from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar/AppBar";
import { connect } from "react-redux";

function Home(props) {
  return (
    <div className="view">
      <AppBar />
      Home
    </div>
  );
}

Home.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
