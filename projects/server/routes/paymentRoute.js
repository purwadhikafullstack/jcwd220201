const express = require("express")
const paymentController = require("../controllers/paymentController")
const productAdminController = require("../controllers/productsAdminController")
const warehousesController = require("../controllers/warehousesController")
const authController = require("../controllers/authController")
const {
  findNearestWarehouse,
  getCartItems,
} = require("../controllers/checkoutController")
const { verifyToken } = require("../middlewares/authMiddleware")
const router = express.Router()

router.patch("/confirm/:id", paymentController.confirmPayment)
router.patch("/reject/:id", paymentController.rejectPayment)

module.exports = router
