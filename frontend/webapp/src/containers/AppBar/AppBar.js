import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/AppBar/SearchBar";
import SchoolBar from "../../components/AppBar/SchoolBar";
import UserBar from "../../components/AppBar/UserBar";
import logo from "../../media/vectors/logo.svg";
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
    const { isAuthenticated } = this.props;

    return (
      <nav className="app-bar">
        <NavLink to="/search" className="logo">
          <img src={logo} alt="Logo" />
        </NavLink>
        <SearchBar subList={subList} />
        <SchoolBar school={undefined} />
        <UserBar isAuthenticated={isAuthenticated} />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.token !== null
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
