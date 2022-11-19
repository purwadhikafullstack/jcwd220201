const jwt = require("jsonwebtoken");

const SECRET_KEY = "fraya123";

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = {
  signToken,
};
