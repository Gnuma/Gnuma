import * as actionTypes from "./actionTypes";
import axios from "axios";

export const searchStart = search_query => {
  return {
    type: actionTypes.SEARCH_START,
    payload: {
      search_query: search_query
    }
  };
};

export const searchSuccess = results => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    payload: {
      results: results
    }
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_FAIL,
    payload: {
      error: error
    }
  };
};

export const search = (search_query, cap) => {
  return dispatch => {
    dispatch(searchStart(search_query));
    /* Query to search
    axios
    .post("http://127.0.0.1:8000/gnuma/v1/auth/login/", {
      search_query,
      cap
    })
    .then(res => {
      dispatch(searchSuccess(res));
    })
    .catch(err => {
      dispatch(searchFail(err));
    }); */
    const results = [
      {
        id: 0,
        name: "Matematica Verde 3",
        img: "",
        authors: "Alessandro Borghesi, Francesca Maravilla",
        price: 26
      },
      {
        id: 1,
        name: "Matematica Verde 3",
        img: "",
        authors: "Alessandro Borghesi, Francesca Maravilla",
        price: 26
      },
      {
        id: 2,
        name: "Matematica Verde 3",
        img: "",
        authors: "Alessandro Borghesi, Francesca Maravilla",
        price: 26
      }
    ];
    dispatch(searchSuccess(results));
  };
};
