import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import testOne from "../store/actions/test";

class Test extends Component {
  constructor(props) {
    super(props);
    this.testRedux = this.testRedux.bind(this);
  }

  testRedux(e) {
    const value = e.target.value;
    this.props.testFun(value);
    console.log(value);
  }

  render() {
    return (
      <form>
        <input type="text" onChange={this.testRedux} />
        <h1>{this.props.test}</h1>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});

const mapDispatchToProps = dispatch => ({
  testFun: test => dispatch(testOne(test))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
