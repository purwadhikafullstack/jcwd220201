const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.opencagedata.com",
});

module.exports = axiosInstance;
