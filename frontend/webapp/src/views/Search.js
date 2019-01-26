import React from "react";
import AppBar from "./AppBar/AppBar";
import MainList from "../components/MainList/MainList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function Search(props) {
  return (
    <div className="view">
      <AppBar />
      <MainList {...props} />
    </div>
  );
}

Search.propTypes = {};

const mapStateToProps = state => ({
  results: state.search.results
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
