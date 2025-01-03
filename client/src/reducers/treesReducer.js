import {
  RECEIVE_TREES,
  RECEIVE_NEW_TREE,
  RECEIVE_USERS,
} from "../actions/treeActions";

const TreesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_TREES:
      return {
        ...newState,
        trees: action.trees,
      };

    case RECEIVE_USERS:
      return Object.assign(newState, action.users);

    case RECEIVE_NEW_TREE:
      newState[action.tree.data._id] = action.tree.data;
      return newState;
    default:
      return state;
  }
};

export default TreesReducer;
