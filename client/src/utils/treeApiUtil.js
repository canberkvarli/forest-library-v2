import axios from "axios";

export const getTrees = async () => {
  try {
    const response = await axios.get("/api/trees");
    return response.data; // Ensure you return the data part of the response
  } catch (error) {
    console.error("Error fetching trees:", error);
  }
};

export const getTree = (userId) => {
  try {
    const response = axios.get(`/api/trees/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tree:", error);
  }
};

export const createTree = (data) => {
  try {
    const response = axios.post("/api/trees", data);
    return response.data;
  } catch (error) {
    console.error("Error creating tree:", error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    console.log("Response from getUsers:", response); // Log the response for debugging
    return response; // Return the full response object, not just the data
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw error to be caught by the calling function
  }
};

export const getUser = (userId) => {
  try {
    const response = axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
