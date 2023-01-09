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
    maxSize: 1 * 1024 * 1024,
  }).array("product_picture"),
  productAdminController.createProducts
)
router.post(
  "/image/:id",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "FILE",
    maxSize: 1 * 1024 * 1024,
  }).single("product_picture"),
  productAdminController.createImages
)
router.get("/", verifyToken, productAdminController.getAllProduct)
router.get("/", categoriesController.getAllCategories)
router.get("/image", verifyToken, productAdminController.getAllImage)
router.get("/:id", verifyToken, productAdminController.getProductById)
router.get("/image/:id", verifyToken, productAdminController.getImageById)
router.patch("/:id", verifyToken, productAdminController.updateProductsByAdmin)
router.delete("/:id", verifyToken, productAdminController.deleteProduct)
router.delete(
  "/image/:id",
  verifyToken,
  productAdminController.deleteProductPicture
)

module.exports = router
