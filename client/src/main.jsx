import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthToken } from "./utils/sessionApiUtil";
import { jwtDecode } from "jwt-decode";
import { Provider } from "react-redux";
import { createAppStore } from "./store/store";
import { logout } from "./actions/sessionActions";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Handle JWT token and preloaded state
let preloadedState = {};
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUser = jwtDecode(localStorage.jwtToken);
  preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    preloadedState = {}; // Clear state if token expired
  }
}

// Create the Redux store with preloaded state
const store = createAppStore(preloadedState);

// Check for token expiration after the store is initialized
if (localStorage.jwtToken && preloadedState.session?.isAuthenticated) {
  const decodedUser = jwtDecode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;

  if (decodedUser.exp < currentTime) {
    // Dispatch logout action
    store.dispatch(logout());
    window.location.href = "/login";
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
