const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://jcwd220201.purwadhikabootcamp.com",
});

module.exports = axiosInstance;
