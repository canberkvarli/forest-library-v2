import {
  addALeaf,
  getLeaves,
  updateLeaf,
  getLeaf,
  deleteLeaf,
} from "../utils/leafApiUtil";

export const RECEIVE_LEAVES = "RECEIVE_LEAVES";
export const RECEIVE_LEAF = "RECEIVE_LEAF";
export const RECEIVE_NEW_LEAF = "RECEIVE_NEW_LEAF";
export const REMOVE_LEAF = "REMOVE_LEAF";

// Action Creators
export const receiveLeaves = (leaves) => ({
  type: RECEIVE_LEAVES,
  leaves,
});

export const receiveLeaf = (leaf) => ({
  type: RECEIVE_LEAF,
  leaf,
});

export const receiveNewLeaf = (leaf) => ({
  type: RECEIVE_NEW_LEAF,
  leaf,
});

export const removeLeaf = (leafId) => ({
  type: REMOVE_LEAF,
  leafId,
});

// Thunk Actions
export const fetchLeaves = () => async (dispatch) => {
  try {
    const response = await getLeaves();
    if (response && response.data) {
      dispatch(receiveLeaves(response.data));
    }
  } catch (err) {
    console.error("Error fetching leaves:", err);
  }
};

export const fetchLeaf = (id) => async (dispatch) => {
  try {
    const response = await getLeaf(id);
    if (response && response.data) {
      dispatch(receiveLeaf(response.data));
    }
  } catch (err) {
    console.error("Error fetching leaf:", err);
  }
};

export const createLeaf = (data) => async (dispatch) => {
  try {
    const response = await addALeaf(data);
    if (response && response.data) {
      console.log("Response from createLeaf:", response.data);
      dispatch(receiveNewLeaf(response.data));
    }
  } catch (err) {
    console.error("Error creating leaf:", err);
  }
};

export const updateLeafData = (data) => async (dispatch) => {
  try {
    const response = await updateLeaf(data);
    if (response && response.data) {
      dispatch(receiveLeaf(response.data));
    }
  } catch (err) {
    console.error("Error updating leaf:", err);
  }
};

export const deleteLeafData = (id) => async (dispatch) => {
  try {
    await deleteLeaf(id);
    dispatch(removeLeaf(id));
  } catch (err) {
    console.error("Error deleting leaf:", err);
  }
};
