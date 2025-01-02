import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import logger from "redux-logger";

export const createAppStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState, // Inject preloaded state dynamically
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(logger),
  });
};
