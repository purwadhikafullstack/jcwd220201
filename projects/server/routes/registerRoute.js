const express = require("express")
const { body } = require("express-validator")

// Controller imports
const {
  duplicateCheck,
  register,
  validateOtp,
  completeRegistration,
  requestOtp,
} = require("../controllers/registerController")

const router = express.Router()

// Duplicate check
router.post(
  "/duplicate",
  // Input must be an email
  body("email").isEmail(),
  duplicateCheck
)

// Register
router.post(
  "/",
  // Input must be an email
  body("email").isEmail(),
  register
)

// Request OTP
router.post("/otp", requestOtp)

// Verify OTP
router.post("/verify", validateOtp)

// Complete registration
router.post(
  "/account",
  body("name").isLength({ min: 3 }),
  body("password").isLength({ min: 8 }),
  completeRegistration
)

module.exports = router
