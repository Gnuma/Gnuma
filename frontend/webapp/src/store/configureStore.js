import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createRootReducer from "./reducers/root";

export const history = createBrowserHistory();

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhances(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk // ... other middlewares ...
      )
    )
  );

  return store;
}
