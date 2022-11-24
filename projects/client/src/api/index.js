import axios from "axios";

// Create an instance to connect with APIs
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosInstance;
