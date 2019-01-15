import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../views/Login-Signup/Login";
import Signup from "../views/Login-Signup/Signup";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../views/Home";
import Search from "../views/Search";
import User from "../views/User";
import Item from "../views/Item";

const BaseRouter = () => (
  <div id="base-router">
    <Route exact path="/" component={Home} />
    <Route exact path="/s=:search_query" component={Search} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/view/:item_id" component={Item} />
    <ProtectedRoute exact path="/user" component={User} />
  </div>
);

export default BaseRouter;
