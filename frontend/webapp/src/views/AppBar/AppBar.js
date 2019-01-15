import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter, Route } from "react-router-dom";
import SearchBar from "../../components/AppBar/SearchBar";
import SchoolBar from "../../components/AppBar/SchoolBar";
import UserBar from "../../components/AppBar/UserBar";
import logo from "../../media/vectors/logo.svg";
import "./AppBar.scss";
import * as authActions from "../../store/actions/auth";
import * as searchActions from "../../store/actions/search";

export class AppBar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

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
    const { isAuthenticated, logout, match, history, search } = this.props;

    return (
      <nav className="app-bar">
        <NavLink to="/" className="logo">
          <img src={logo} alt="Logo" />
        </NavLink>
        <SearchBar
          search={search}
          searchQuery={match.params.search_query}
          subList={subList}
        />
        <SchoolBar school={undefined} />
        <UserBar isAuthenticated={isAuthenticated} logout={logout} />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  searchQuery: state.search.searchQuery
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.authLogout()),
    search: (search_query, cap) =>
      dispatch(searchActions.search(search_query, cap))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppBar)
);
