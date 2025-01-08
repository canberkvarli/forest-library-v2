import * as APIUtil from "../utils/sessionApiUtil";
import { jwtDecode } from "jwt-decode";
import { setSession, clearSession } from "../reducers/sessionReducer";
import { fetchTrees, fetchUsers } from "./treeActions";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

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

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// Thunk for signup
export const signup = (user) => async (dispatch) => {
  try {
    // Try to signup
    const signupResponse = await APIUtil.signup(user);

    // Check if the response contains validation errors
    if (signupResponse && signupResponse.data.errors) {
      // Dispatch the validation errors to the store
      dispatch(receiveErrors(signupResponse.data.errors));
    } else if (signupResponse.data.success) {
      // Proceed to login if signup is successful (if success flag exists)
      dispatch(login(user));
      dispatch(fetchUsers());
      dispatch(fetchTrees());
    }
  } catch (err) {
    // Log the error for debugging purposes
    console.log("Error response:", err.response);

    // Dispatch the error to the store
    dispatch(receiveErrors(err.response.data));
  }
};

// Thunk for login
export const login = (user) => async (dispatch) => {
  try {
    const loginResponse = await APIUtil.login(user);

    if (loginResponse && loginResponse.data.errors) {
      dispatch(receiveErrors(loginResponse.data.errors));
    } else if (loginResponse.data.success) {
      const { token } = loginResponse.data;

      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);

      const decoded = jwtDecode(token);

      dispatch(setSession(decoded));
    }
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
