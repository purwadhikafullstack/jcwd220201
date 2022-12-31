const express = require("express")
const authController = require("../controllers/authController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()
const { upload } = require("../lib/uploader")
const { validToken } = require("../lib/jwt")

router.post("/login", authController.loginUser)
router.post("/forgot-password", authController.forgotPassword)
router.patch(
  "/profile",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PROF",
  }).single("profile_picture"),
  authController.editUserProfile
)
router.patch(
  "/profile/password/:id",
  verifyToken,
  authController.editUserPassword
)
router.patch("/recover-password", authController.recoverPassword)

router.get("/refresh-token", verifyToken, authController.refreshToken)
router.get("/:id", authController.getUserById)
router.get("/", authController.getAllUser)

module.exports = router
