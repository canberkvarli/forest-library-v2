import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { setAuthToken } from "./utils/sessionApiUtil";
import { jwtDecode } from "jwt-decode";
import { Provider } from "react-redux";
import { createAppStore } from "./store/store";
import { logout } from "./actions/sessionActions";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const initializeStore = () => {
  const preloadedState = {};
  if (localStorage.jwtToken) {
    const decodedUser = jwtDecode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp >= currentTime) {
      preloadedState.session = {
        isAuthenticated: true,
        user: decodedUser,
      };
      setAuthToken(localStorage.jwtToken);
    }
  }
  return createAppStore(preloadedState);
};

const store = initializeStore();

// Check token expiration after store creation
if (localStorage.jwtToken && store.getState().session.isAuthenticated) {
  const decodedUser = jwtDecode(localStorage.jwtToken);
  if (decodedUser.exp < Date.now() / 1000) {
    store.dispatch(logout());
    window.location.href = "/login";
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
