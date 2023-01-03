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
  body("email").not().isEmpty().isEmail().normalizeEmail(),
  register
)

// Request OTP
router.post("/otp", requestOtp)

// Verify OTP
router.post("/verify", validateOtp)

// Complete registration
router.post(
  "/account",
  // Input must be valid
  body("name").not().isEmpty().trim().escape().isLength({ min: 3 }),
  body("password").not().isEmpty().trim().isLength({ min: 8 }),
  completeRegistration
)

module.exports = router
