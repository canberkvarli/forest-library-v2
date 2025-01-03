import { getTrees, getTree, createTree, getUsers } from "../utils/treeApiUtil";

export const RECEIVE_TREES = "RECEIVE_TREES";
export const RECEIVE_TREE = "RECEIVE_TREE";
export const RECEIVE_NEW_TREE = "RECEIVE_NEW_TREE";
export const RECEIVE_USERS = "RECEIVE_USERS";

// Action Creators
export const receiveTrees = (trees) => ({
  type: RECEIVE_TREES,
  trees,
});

export const receiveTree = (tree) => ({
  type: RECEIVE_TREE,
  tree,
});

export const receiveNewTree = (tree) => ({
  type: RECEIVE_NEW_TREE,
  tree,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

// Thunk Actions
export const fetchTrees = () => async (dispatch) => {
  try {
    const trees = await getTrees();
    if (trees && trees.data) {
      dispatch(receiveTrees(trees));
    }
  } catch (err) {
    console.error("Error fetching trees:", err);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await getUsers(); // Ensure the promise is resolved
    console.log("Response after fetching:", response); // Log the full response
    if (response && response.data) {
      const users = response.data; // Extract the data portion
      console.log("Users after fetching:", users); // Log the users data
      dispatch(receiveUsers(users)); // Dispatch the action with the users data
    } else {
      console.error("Users data is missing in the response:", response);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

export const fetchTree = (userId) => async (dispatch) => {
  try {
    const tree = await getTree(userId);
    dispatch(receiveTree(tree));
  } catch (err) {
    console.error("Error fetching tree:", err);
  }
};

export const makeTree = (data) => async (dispatch) => {
  try {
    const newTree = await createTree(data);
    dispatch(receiveNewTree(newTree));
  } catch (err) {
    console.error("Error creating tree:", err);
  }
};
