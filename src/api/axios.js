import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Token being sent:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request headers:", config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
