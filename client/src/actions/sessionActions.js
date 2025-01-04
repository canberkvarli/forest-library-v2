import * as APIUtil from "../utils/sessionApiUtil";
import { jwtDecode } from "jwt-decode";
import { setSession, clearSession } from "../reducers/sessionReducer";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

// We'll dispatch this when our user signs in
export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// This will be used to redirect the user to the login page upon signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

// We dispatch this one to show authentication errors on the frontend
export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
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
