const express = require("express")
const warehouseUserController = require("../controllers/warehouseUserController")
const warehousesController = require("../controllers/warehousesController")
const authController = require("../controllers/authController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", verifyToken, warehouseUserController.createUserHouse)
router.get("/", verifyToken, warehouseUserController.getAllWareUser)
router.get("/", verifyToken, authController.getAllUser)
router.get("/", verifyToken, warehousesController.getAllWarehouses)
router.patch("/:id", verifyToken, warehouseUserController.updateWareUserById)
router.delete("/:id", verifyToken, warehouseUserController.deleteWareUserById)

module.exports = router
