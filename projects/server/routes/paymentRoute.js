const express = require("express")
const paymentController = require("../controllers/paymentController")
const productAdminController = require("../controllers/productsAdminController")
const router = express.Router()

router.get("/", paymentController.getPayment)
// router.get("/order", paymentController.getPayment)
router.get("/:id", paymentController.getPaymentById)
router.get("product-admin", productAdminController.getAllProduct)
// router.get("/product", paymentController.getProductPayment)
router.patch("/confirm/:id", paymentController.confirmPayment)
router.patch("/reject/:id", paymentController.rejectPayment)

module.exports = router
