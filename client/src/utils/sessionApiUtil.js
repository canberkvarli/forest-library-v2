import api from "./api";

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  return api.post("/api/users/register", userData);
};

export const login = (userData) => {
  return api.post("/api/users/login", userData);
};
