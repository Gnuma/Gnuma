import React from "react";
import { Route } from "react-router-dom";
import AppBar from "./containers/AppBar";
import MainList from "./containers/MainList";
const BaseRouter = () => (
  <div>
    <Route path="/" component={AppBar} />
    <Route exact path="/s/" component={MainList} />
  </div>
);

export default BaseRouter;
