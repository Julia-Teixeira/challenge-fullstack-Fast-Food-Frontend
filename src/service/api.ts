import axios from "axios";

const api = axios.create({
  baseURL: "https://challenge-fullstack-fast-food-backend.onrender.com",
});

export default api;
