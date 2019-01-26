import React from "react";
import PropTypes from "prop-types";
import AppBar from "./AppBar/AppBar";
import { connect } from "react-redux";
import HomeImage from "../media/vectors/home-image.svg";

function Home(props) {
  return (
    <div className="view">
      <AppBar />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <img src={HomeImage} alt="Hi" draggable={false} />
      </div>
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
