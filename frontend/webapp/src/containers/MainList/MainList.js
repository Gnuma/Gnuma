import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfoBar from "../../components/InfoBar/InfoBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import StandardList from "../../components/StandardList/StandardList";
import "./MainList.scss";

export class MainList extends Component {
  render() {
    return (
      <div>
        <InfoBar
          office="I.I.S.S J. Von Neumann"
          subjects={["Italiano", "Matematica", "Inglese", "Informatica"]}
        />
        <div className="main-list">
          <FilterPanel />
          <StandardList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainList);
