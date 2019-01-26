import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: null,
  error: null,
  loading: false,
  searchQuery: null
};

const searchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    searchQuery: action.payload.search_query
  });
};

const searchSuccess = (state, action) => {
  return updateObject(state, {
    results: action.payload.results,
    error: null,
    loading: false
  });
};

const searchFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return searchStart(state, action);

    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);

    case actionTypes.SEARCH_FAIL:
      return searchFail(state, action);

    default:
      return state;
  }
};

export default reducer;
