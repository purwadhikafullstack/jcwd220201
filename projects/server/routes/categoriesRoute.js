const express = require("express")
const { categoriesController } = require("../controllers")

const router = express.Router()

router.post("/", categoriesController.createCategory)
router.get("/", categoriesController.getAllCategories)
router.get("/:id", categoriesController.getCategoryById)
router.patch("/:id", categoriesController.updateCategoryById)
router.delete("/:id", categoriesController.deleteCategoryById)

module.exports = router
