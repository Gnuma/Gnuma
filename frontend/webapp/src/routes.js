import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppBar from "./containers/AppBar/AppBar";
import MainList from "./containers/MainList/MainList";
import Login from "./containers/Login-Signup/Login";
import Signup from "./containers/Login-Signup/Signup";
const BaseRouter = () => (
  <div id="base-router">
    <Route path="/search" component={AppBar} />
    <Route path="/search/:key" component={MainList} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </div>
);

export default BaseRouter;
