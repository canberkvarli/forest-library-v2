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

export const addALeaf = (leaf) => {
  try {
    const response = axios.post("/api/leaves", leaf);
    return response.data;
  } catch (error) {
    console.error("Error adding leaf:", error);
  }
};

export const updateLeaf = (leaf) => {
  try {
    const response = axios.put(`/api/leaves/${leaf._id}`, leaf);
    return response.data;
  } catch (error) {
    console.error("Error updating leaf:", error);
  }
};

export const deleteLeaf = (leaf) => {
  try {
    const response = axios.delete(`/api/leaves/${leaf._id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting leaf:", error);
  }
};
