const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/login", adminController.adminLogin);
router.patch("/send", adminController.sendOrder);
router.post("/cancel", adminController.cancelOrder);

module.exports = router;
