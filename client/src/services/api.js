import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auth Endpoints
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);

// Alert Endpoints
export const fetchAlerts = () => API.get("/alerts");
export const createAlert = (alertData) => API.post("/alerts", alertData);

export default API;