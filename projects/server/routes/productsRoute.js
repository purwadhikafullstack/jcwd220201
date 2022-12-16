const express = require("express")
const productsController = require("../controllers/productsController")
const router = express.Router()

// Product & Product ID & All Category
router.get("/", productsController.getAllProducts)
router.get("/category", productsController.getAllProductCategory)
router.get("/:id", productsController.getProductsByID)

// Image Product
router.get("/image/:id", productsController.getProductsImage)

// Category ID Product
router.get("/category/:id", productsController.getProductCategoryId)

module.exports = router
