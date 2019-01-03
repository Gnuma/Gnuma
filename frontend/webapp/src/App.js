import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "./icons";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <BaseRouter />
        </Router>
      </div>
    );
  }
}

export default App;
