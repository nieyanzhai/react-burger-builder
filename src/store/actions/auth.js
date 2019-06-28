import * as actionsType from "./actionsType";
import axios from "../../axios";

export const authStart = () => {
  return {
    type: actionsType.AUTH_START
  };
};

export const authSuccess = data => {
  return {
    type: actionsType.AUTH_SUCCESS,
    payload: data
  };
};

export const authFail = err => {
  return {
    type: actionsType.AUTH_FAIL,
    payload: err
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionsType.AUTH_LOGOUT
  };
};

export const logoutAsync = expireTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
};

export const authAsync = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBwXgqxtMz4JHCQN9EiZqT_dGoHv5btM2k";
    if (!isSignUp) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBwXgqxtMz4JHCQN9EiZqT_dGoHv5btM2k";
    }

    axios
      .post(url, authData)
      .then(resp => {
        localStorage.setItem("token", resp.data.idToken);
        localStorage.setItem("userId", resp.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + resp.data.expiresIn * 1000)
        );
        dispatch(authSuccess(resp.data));
        dispatch(logoutAsync(resp.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionsType.SET_AUTH_REDIRECT_PATH,
    payload: path
  };
};

export const authCheck = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({ idToken: token, localId: userId }));
        dispatch(
          logoutAsync((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
