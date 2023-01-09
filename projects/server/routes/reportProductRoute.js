const express = require("express")
const salesReport = require("../controllers/reportController")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/report", verifyToken, salesReport.getReportWithQuery)

module.exports = router
