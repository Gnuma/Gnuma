import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchBar from "../../components/AppBar/SearchBar";
import SchoolBar from "../../components/AppBar/SchoolBar";
import UserBar from "../../components/AppBar/UserBar";
import "./AppBar.scss";

export class AppBar extends Component {
  state = {
    subList: [
      {
        id: 0,
        name: "Qualsiasi Materia"
      },
      {
        id: 1,
        name: "Matematica"
      },
      {
        id: 2,
        name: "Italiano"
      },
      {
        id: 3,
        name: "Inglese"
      }
    ],
    user: {
      uid: "Francesco",
      school: "J. Von Neumann"
    }
  };

  render() {
    const { subList } = this.state;

    return (
      <nav className="app-bar">
        <div className="app-logo">GNUMA</div>
        <SearchBar subList={subList} />
        <SchoolBar school={undefined} />
        <UserBar />
      </nav>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
