const express = require("express")
const { upload } = require("../lib/uploader")
const productAdminController = require("../controllers/productsAdminController")
const { verifyToken } = require("../middlewares/authMiddleware")
const { categoriesController } = require("../controllers")

const router = express.Router()

router.post(
  "/",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "FILE",
  }).array("product_picture", 5),
  productAdminController.createProducts
)
router.post(
  "/image/:id",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "FILE",
  }).single("product_picture"),
  productAdminController.createImages
)
router.get("/", productAdminController.getAllProduct)
router.get("/", categoriesController.getAllCategories)
router.get("/image", productAdminController.getAllImage)
router.get("/:id", productAdminController.getProductById)
router.get("/image/:id", productAdminController.getImageById)
router.patch("/:id", verifyToken, productAdminController.updateProductsByAdmin)
router.delete("/:id", verifyToken, productAdminController.deleteProduct)
router.delete(
  "/image/:id",
  verifyToken,
  productAdminController.deleteProductPicture
)

module.exports = router
