import { getTrees, getTree, createTree, getUsers } from "../utils/treeApiUtil";

export const RECEIVE_TREES = "RECEIVE_TREES";
export const RECEIVE_TREE = "RECEIVE_TREE";
export const RECEIVE_NEW_TREE = "RECEIVE_NEW_TREE";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveTrees = (trees) => ({
  type: RECEIVE_TREES,
  trees,
});

export const receiveUserTree = (tree) => ({
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

export const fetchTrees = () => (dispatch) =>
  getTrees()
    .then((trees) => dispatch(receiveTrees(trees)))
    .catch((err) => console.log(err));

export const fetchUsers = () => (dispatch) =>
  getUsers()
    .then((users) => dispatch(receiveUsers(users)))
    .catch((err) => console.log(err));

export const getUser = (state, id) => {
  let users = Object.values(state.entities.trees);
  return users.filter((user) => user._id === id);
};

export const fetchTree = (userId) => (dispatch) =>
  getTree(userId)
    .then((tree) => dispatch(receiveUserTree(tree)))
    .catch((err) => console.log(err));

export const makeTree = (data) => (dispatch) =>
  createTree(data)
    .then((tree) => dispatch(receiveNewTree(tree)))
    .catch((err) => console.log(err));
