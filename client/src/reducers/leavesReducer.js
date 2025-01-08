import {
  RECEIVE_LEAVES,
  RECEIVE_LEAF,
  RECEIVE_NEW_LEAF,
  REMOVE_LEAF,
} from "../actions/leafActions";

const LeavesReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };

  switch (action.type) {
    case RECEIVE_LEAVES: {
      const leaves = {};
      action.leaves.forEach((leaf) => {
        leaves[leaf._id] = leaf;
      });
      return { ...newState, ...leaves };
    }

    case RECEIVE_LEAF:
    case RECEIVE_NEW_LEAF:
      newState[action.leaf._id] = action.leaf;
      return newState;

    case REMOVE_LEAF:
      delete newState[action.leafId];
      return newState;

    default:
      return state;
  }
};

export default LeavesReducer;
