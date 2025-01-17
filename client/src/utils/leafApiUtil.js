import axios from "axios";

export const getLeaves = async () => {
  try {
    const response = await axios.get("/api/leaves");
    return response.data;
  } catch (error) {
    console.error("Error fetching leaves:", error);
  }
};

// export const getUserLeaves = id => {
//     return axios.get(`/api/leaves/user/${id}`);
// };

export const getLeaf = async (id) => {
  try {
    const response = axios.get(`/api/leaves/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaf:", error);
  }
};

export const addALeaf = async (leaf) => {
  try {
    const response = await axios.post("/api/leaves", leaf);
    console.log("Leaf added successfully", response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error("Error adding leaf:", error);
    throw error; // Re-throw to handle in the thunk
  }
};

export const updateLeaf = (leaf) => {
  try {
    const response = axios.patch(`/api/leaves/${leaf._id}`, leaf);
    return response.data;
  } catch (error) {
    console.error("Error updating leaf:", error);
  }
};

export const deleteLeaf = async (leafId) => {
  try {
    const response = await axios.delete(`/api/leaves/${leafId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting leaf:", error);
    throw error;
  }
};

export const getLeavesByTreeId = async (treeId) => {
  try {
    const response = await axios.get(`/api/leaves/tree/${treeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaves by tree ID:", error);
  }
};

export const getLeavesByUserId = async (userId) => {
  try {
    const response = await axios.get(`/api/leaves/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaves by user ID:", error);
    throw error;
  }
};
