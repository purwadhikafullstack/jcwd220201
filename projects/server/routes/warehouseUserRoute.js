const express = require("express")
const warehouseUserController = require("../controllers/warehouseUserController")
const warehousesController = require("../controllers/warehousesController")
const authController = require("../controllers/authController")

const router = express.Router()

router.post("/", warehouseUserController.createUserHouse)
router.get("/", warehouseUserController.getAllWareUser)
router.get("/", authController.getAllUser)
router.get("/", warehousesController.getAllWarehouses)
router.patch("/:id", warehouseUserController.updateWareUserById)
router.delete("/:id", warehouseUserController.deleteWareUserById)

module.exports = router
