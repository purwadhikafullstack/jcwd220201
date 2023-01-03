const express = require("express")
const { adminUserController } = require("../controllers")

const router = express.Router()

router.post("/", adminUserController.createAdminUser)
router.get("/admin", adminUserController.getAllAdminUser)
router.get("/user", adminUserController.getAllUser)
router.get("/:id", adminUserController.getAdminUserById)
router.patch("/:id", adminUserController.updateAdminUserById)
router.delete("/:id", adminUserController.deleteAdminUserById)

module.exports = router
