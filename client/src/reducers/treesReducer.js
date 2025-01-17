import {
  RECEIVE_TREES,
  RECEIVE_NEW_TREE,
  RECEIVE_USERS,
  RECEIVE_TREE,
} from "../actions/treeActions";

const initialState = {
  users: {},
  trees: {},
};

const TreesReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = { ...state };

  switch (action.type) {
    case RECEIVE_TREES:
      return {
        ...newState,
        trees: {
          ...newState.trees,
          ...action.trees.reduce((acc, tree) => {
            acc[tree._id] = tree;
            return acc;
          }, {}),
        },
      };

    case RECEIVE_TREE:
      if (!action.tree) return newState; // Prevent crashes if undefined
      return {
        ...newState,
        trees: { ...newState.trees, [action.tree._id]: action.tree },
      };

    case RECEIVE_USERS:
      return {
        ...newState,
        users: {
          ...newState.users,
          ...action.users.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
          }, {}),
        },
      };

    case RECEIVE_NEW_TREE:
      if (!action.tree) return newState;
      return {
        ...newState,
        trees: { ...newState.trees, [action.tree._id]: action.tree },
      };

    default:
      return newState;
  }
};

export default TreesReducer;
