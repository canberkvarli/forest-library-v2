import {
  addALeaf,
  getLeaves,
  updateLeaf,
  getLeaf,
  deleteLeaf,
  getLeavesByUserId,
} from "../utils/leafApiUtil";

export const RECEIVE_LEAVES = "RECEIVE_LEAVES";
export const RECEIVE_LEAF = "RECEIVE_LEAF";
export const RECEIVE_NEW_LEAF = "RECEIVE_NEW_LEAF";
export const REMOVE_LEAF = "REMOVE_LEAF";
export const RECEIVE_LEAVES_BY_USER_ID = "RECEIVE_LEAVES_BY_USER_ID";

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

export const receiveLeavesByUserId = (leaves) => ({
  type: RECEIVE_LEAVES_BY_USER_ID,
  leaves,
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

export const fetchLeavesByUserId = (userId) => async (dispatch) => {
  try {
    const response = await getLeavesByUserId(userId);
    if (response) {
      dispatch(receiveLeavesByUserId(response));
    }
  } catch (err) {
    console.error("Error fetching leaves by user ID:", err);
  }
};

export const createLeaf = (data) => async (dispatch) => {
  try {
    const response = await addALeaf(data);

    if (response) {
      dispatch(receiveNewLeaf(response));
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
