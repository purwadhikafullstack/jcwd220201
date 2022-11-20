import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

// Create an instance to connect with APIs
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default instance;
