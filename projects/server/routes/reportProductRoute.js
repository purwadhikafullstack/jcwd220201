const express = require("express")
const salesReport = require("../controllers/reportController")

const router = express.Router()

router.get("/", salesReport.getTodayOrder)

router.get("/highrevenue", salesReport.highRevenue)
router.get("/lowrevenue", salesReport.lowRevenue)
router.get("/order", salesReport.getAllTransactions)
router.get("/orderitem", salesReport.getOrderItem)
router.get("/report", salesReport.getReportWithQuery)

module.exports = router
