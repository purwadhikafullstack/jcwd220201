const express = require("express")
const { provincesController } = require("../controllers")

const router = express.Router()

router.get("/", provincesController.getAllProvinces)
router.get("/:id", provincesController.getProvinceByID)

module.exports = router
