const jwt = require("jsonwebtoken");

const createVerificationToken = (payload) => {
  return jwt.sign(payload, process.env.VERIFICATION_KEY);
};

const validateVerificationToken = (token) => {
  return jwt.verify(token, process.env.VERIFICATION_KEY);
};

module.exports = {
  createVerificationToken,
  validateVerificationToken,
};
