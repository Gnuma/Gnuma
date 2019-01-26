import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "./style/main.scss";
import "./style/general.scss";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store/configureStore";

const store = configureStore();

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
