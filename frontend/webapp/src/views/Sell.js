import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MainSell from "../components/MainSell/MainSell";

function Sell(props) {
  return (
    <div className="view">
      <MainSell token={props.token} />
    </div>
  );
}

Sell.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sell);
