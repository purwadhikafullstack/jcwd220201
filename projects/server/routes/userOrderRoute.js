const express = require("express")
const router = express.Router()
const userOrderController = require("../controllers/userOrderController")
const { verifyToken } = require("../middlewares/authMiddleware")

// Get All User - Login With Admin
router.get("/all-user", userOrderController.getAllUserOrder)

// For User CancelOrder
router.patch("/cancel/:id", userOrderController.cancelOrderUser)

module.exports = router
