import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import authReducer from "./auth";
import searchReducer from "./search";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    search: searchReducer
  });
