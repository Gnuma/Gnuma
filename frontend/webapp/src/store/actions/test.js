import * as actionTypes from "./actionTypes";

export default function testOne(value) {
  return {
    type: actionTypes.TEST_ONE,
    payload: value
  };
}
