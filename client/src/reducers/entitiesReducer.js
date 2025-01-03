import { combineReducers } from "redux";

import TreesReducer from "./treesReducer";
// import LeavesReducer from "./leaves_reducer";

export default combineReducers({
  trees: TreesReducer,
  //   leaves: LeavesReducer,
});
