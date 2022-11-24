const express = require("express")
const { citiesController } = require("../controllers")

const router = express.Router()

router.get("/", citiesController.getAllCities)
router.get("/:id", citiesController.getCityByID)

module.exports = router
