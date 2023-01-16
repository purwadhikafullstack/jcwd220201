const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
});

module.exports = { axiosInstance };
