const express = require("express")
const router = express.Router()
const userOrderController = require("../controllers/userOrderController")
const { verifyToken } = require("../middlewares/authMiddleware")

// Get All User - Login With Admin
router.get("/all-user", userOrderController.getAllUserOrder2)
// Warehouse Id - Login by Warehouse Admin
router.get("/all-user/:id", userOrderController.getWarehouseById)

module.exports = router
