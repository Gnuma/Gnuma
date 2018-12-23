import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  test: null
};

const testOne = (state, action) => {
  return updateObject(state, {
    test: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEST_ONE:
      return testOne(state, action);
    default:
      return state;
  }
};

export default reducer;
