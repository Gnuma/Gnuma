import React from "react";
import { Route } from "react-router-dom";
import AppBar from "./containers/AppBar";
const BaseRouter = () => (
  <div>
    <Route exact path="/" component={AppBar} />
  </div>
);

export default BaseRouter;
