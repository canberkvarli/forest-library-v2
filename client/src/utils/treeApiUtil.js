import axios from "axios";

// ✅ GET ALL TREES (with leaves populated)
export const getTrees = async () => {
  try {
    const response = await axios.get("/api/trees");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching trees:",
      error.response?.data || error.message
    );
  }
};

// ✅ GET SINGLE TREE
export const getTree = async (treeId) => {
  try {
    const response = await axios.get(`/api/trees/${treeId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tree:",
      error.response?.data || error.message
    );
  }
};

// ✅ CREATE TREE
export const createTree = async (data) => {
  try {
    const response = await axios.post("/api/trees", data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating tree:",
      error.response?.data || error.message
    );
  }
};

// ✅ GET ALL USERS
export const getUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data; // ✅ Only return the `data` portion
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ GET SINGLE USER
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
  }
};
