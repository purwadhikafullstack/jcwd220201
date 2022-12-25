const express = require("express")
const { warehousesController } = require("../controllers")

const router = express.Router()

router.post("/", warehousesController.createWarehouse)
router.get("/", warehousesController.getAllWarehouses)
router.get("/:id", warehousesController.getWarehouseById)
router.patch("/:id", warehousesController.updateWarehouseById)
router.delete("/:id", warehousesController.deleteWarehouseById)

module.exports = router
