import axios from "axios";

export const getTrees = () => {
  return axios.get("/api/trees");
};

export const getTree = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

export const createTree = (data) => {
  return axios.post("/api/trees", data);
};

export const getUsers = () => {
  return axios.get("/api/users");
};
