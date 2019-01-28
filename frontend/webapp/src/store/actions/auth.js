import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const loginSuccess = token => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = "Token " + token; // for all requests
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token: token
    }
  };
};

export const logoutSuccess = () => {
  localStorage.removeItem("token");
  axios.defaults.headers.common["Authorization"] = undefined; // for all requests
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/gnuma/v1/auth/login/", {
        username,
        password
      })
      .then(res => {
        const token = res.data.key;
        dispatch(loginSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authStart());
    const token = localStorage.getItem("token");
    if (token === null) {
      dispatch(authFail("The user wasn't logged in"));
    } else {
      axios
        .post("http://127.0.0.1:8000/gnuma/v1/auth/logout/")
        .then(() => {
          dispatch(logoutSuccess());
        })
        .catch(err => {
          dispatch(authFail(err));
        });
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === null) {
      dispatch(logoutSuccess());
    } else {
      dispatch(loginSuccess(token));
    }
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/gnuma/v1/auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        axios
          .post("http://127.0.0.1:8000/gnuma/v1/init/", {
            key: token,
            classM: "5B",
            office: "J. Von Neumann"
          })
          .then(res => {
            dispatch(loginSuccess(token));
          })
          .catch(err => {
            dispatch(authFail(err));
          });
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
