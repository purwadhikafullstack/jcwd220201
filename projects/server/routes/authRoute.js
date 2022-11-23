const express = require("express")
const authController = require("../controllers/authController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()
const { upload } = require("../lib/uploader")

router.post("/login", authController.loginUser)
router.patch(
  "/profile",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "PROF",
  }).single("profile_picture"),
  authController.editUserProfile
)

router.get("/refresh-token", verifyToken, authController.refreshToken)
router.get("/:id", authController.getUserById)
router.get("/", authController.getAllUser)

module.exports = router
