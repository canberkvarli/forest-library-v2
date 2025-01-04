import { combineReducers } from "@reduxjs/toolkit";
import session from "./sessionReducer";
// Uncomment and add additional reducers as needed
import errors from "./errorsReducer";
import entities from "./entitiesReducer";

const RootReducer = combineReducers({
  session,
  errors,
  entities,
});

export default RootReducer;
