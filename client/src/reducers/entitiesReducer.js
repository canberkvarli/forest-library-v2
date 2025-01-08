import { combineReducers } from "redux";

import TreesReducer from "./treesReducer";
import LeavesReducer from "./leavesReducer";

export default combineReducers({
  trees: TreesReducer,
  leaves: LeavesReducer,
});
