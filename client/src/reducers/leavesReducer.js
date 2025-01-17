import {
  RECEIVE_LEAVES,
  RECEIVE_LEAF,
  RECEIVE_NEW_LEAF,
  REMOVE_LEAF,
  RECEIVE_LEAVES_BY_USER_ID,
} from "../actions/leafActions";

const initialState = {};

const LeavesReducer = (state = initialState, action) => {
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

    case RECEIVE_NEW_LEAF: {
      const leaf = action.leaf;
      if (!leaf || !leaf._id) return newState;
      return { ...newState, [leaf._id]: leaf };
    }

    case RECEIVE_LEAF: {
      const leaf = action.leaf;
      if (!leaf || !leaf._id) return newState;
      return { ...newState, [leaf._id]: leaf };
    }

    case RECEIVE_LEAVES_BY_USER_ID: {
      const leaves = {};
      action.leaves.forEach((leaf) => {
        leaves[leaf._id] = leaf;
      });
      return { ...newState, ...leaves };
    }

    case REMOVE_LEAF:
      delete newState[action.leafId];
      return newState;

    default:
      return newState;
  }
};

export default LeavesReducer;
