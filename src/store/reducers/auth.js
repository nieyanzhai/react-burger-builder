import * as actionsType from "../actions/actionsType";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userID: null,
  loading: false,
  error: null,
  authRedirectPath: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.idToken,
    userID: action.payload.localId,
    loading: false,
    error: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userID: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTH_START:
      return authStart(state, action);
    case actionsType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionsType.AUTH_FAIL:
      return authFail(state, action);
    case actionsType.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionsType.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
