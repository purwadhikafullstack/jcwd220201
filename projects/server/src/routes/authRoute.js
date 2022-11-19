const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", authController.loginUser);

module.exports = router;
