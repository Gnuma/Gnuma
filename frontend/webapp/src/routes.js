import React from "react";
import { Route } from "react-router-dom";
import AppBar from "./containers/AppBar/AppBar";
import MainList from "./containers/MainList/MainList";
const BaseRouter = () => (
  <div className="base-router">
    <Route path="/" component={AppBar} />
    <Route exact path="/s/" component={MainList} />
  </div>
);

export default BaseRouter;
