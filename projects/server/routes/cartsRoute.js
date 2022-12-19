const express = require("express")
const cartController = require("../controllers/cartsController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", verifyToken, cartController.addToCart)
router.get("/me", verifyToken, cartController.getAllMyCartItems)
router.get("/:id", cartController.getCartById)
router.patch("/addQty/:ProductId", cartController.addProductQty)
router.get(
  "/cart-product/ProductId/:ProductId",
  cartController.getCartProductById
)
router.delete("/:id", cartController.deleteProduct)
router.patch("/productCheck/:id", cartController.checkProduct)
router.patch("/checkAllProduct", verifyToken, cartController.checkAllProduct)
router.get("/price/total", verifyToken, cartController.totalPrice)
router.delete("/delete/all", verifyToken, cartController.deleteAllProduct)
router.get(
  "/cart-product/ProductId/:ProductId",
  cartController.getCartProductById
)
router.post("/addQty/:id", cartController.addQty)
router.patch("/decQty/:id", cartController.decreaseQty)

module.exports = router
