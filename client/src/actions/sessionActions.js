import * as APIUtil from "../utils/sessionApiUtil";
import { jwtDecode } from "jwt-decode";
import { setSession, clearSession } from "../reducers/sessionReducer";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// Thunk for signup
export const signup = (user) => async (dispatch) => {
  try {
    await APIUtil.signup(user);
    dispatch(login(user));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

// Thunk for login
export const login = (user) => async (dispatch) => {
  try {
    const res = await APIUtil.login(user);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    APIUtil.setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch(setSession(decoded));
  } catch (err) {
    dispatch(receiveErrors(err.response.data));
  }
};

// Thunk for logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(clearSession());
};
