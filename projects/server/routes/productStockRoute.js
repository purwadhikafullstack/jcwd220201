const express = require("express")
const productStockController = require("../controllers/productStockController")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")

// Get All Warehouse
router.get(
  "/all-warehouse",
  verifyToken,
  productStockController.getAllWarehouse
)
// Warehouse Id
router.get(
  "/all-product/:id",
  verifyToken,
  productStockController.getProductStockWarehouse
)
// ProductStock Id
router.patch(
  "/update_stock/:id",
  verifyToken,
  productStockController.updateProductStock
)
// ProductStock Id
router.patch(
  "/delete-stock/:id",
  verifyToken,
  productStockController.deleteProductStock
)
router.get("/all-category", verifyToken, productStockController.getAllCategory)

module.exports = router
