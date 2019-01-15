import React from "react";
import AppBar from "./AppBar/AppBar";
import MainList from "../components/MainList/MainList";
import { connect } from "react-redux";

function Search(props) {
  return (
    <div>
      <AppBar />
      <MainList {...props} />
    </div>
  );
}

Search.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
