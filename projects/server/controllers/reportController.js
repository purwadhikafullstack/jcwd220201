const moment = require("moment")
const { Op } = require("sequelize")
const { sequelize } = require("../models")
const db = require("../models")

const salesReport = {
  getReportWithQuery: async (req, res) => {
    const CategoryId = req.query.CategoryId
    const WarehouseId = req.query.WarehouseId
    const {
      payment_date = "",
      product_name = "",
      category = "",
      _limit = 6,
      _page = 1,
      _sortDir = "DESC",
    } = req.query

    try {
      const { _sortBy = "" } = req.query
      let sql = `SELECT  ord.WarehouseId, pr.CategoryId, pr.id AS productId, ct.category, pr.product_name, us.name, ord.total_price, wr.warehouse_name, ord.payment_date
      FROM orderitems AS ord_items
      JOIN orders AS ord ON ord.id = ord_items.OrderId
      JOIN products AS pr ON pr.id = ord_items.ProductId
      JOIN categories AS ct ON ct.id = pr.CategoryId
      JOIN warehouse as wr ON wr.id = ord.WarehouseId
      JOIN users as us ON us.id = ord.UserId `

      if (WarehouseId && CategoryId && payment_date && category) {
        sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} AND MONTH(ord.payment_date)=${payment_date} AND category=${category} `
      } else if (WarehouseId && CategoryId) {
        sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} `
      } else if (WarehouseId && payment_date) {
        sql += `WHERE WarehouseId=${WarehouseId} AND MONTH(ord.payment_date)=${payment_date} `
      } else if (WarehouseId && category) {
        sql += `WHERE WarehouseId=${WarehouseId} AND category=${category} `
      } else if (CategoryId && payment_date) {
        sql += `WHERE CategoryId=${CategoryId} AND MONTH(ord.payment_date)=${payment_date} `
      } else if (category && payment_date) {
        sql += `WHERE category=${category} AND MONTH(ord.payment_date)=${payment_date} `
      } else if (CategoryId) {
        sql += `WHERE CategoryId=${CategoryId} `
      } else if (WarehouseId) {
        sql += `WHERE WarehouseId=${WarehouseId} `
      } else if (payment_date) {
        sql += `WHERE MONTH(ord.payment_date)=${payment_date} `
      } else if (product_name) {
        sql += `WHERE pr.product_name LIKE "%${product_name}%" `
      } else if (category) {
        sql += `WHERE ct.category LIKE "%${category}%" `
      }

      const dataCount = await db.sequelize.query(sql)
      const dataCountReal = dataCount[0]

      sql += `ORDER BY ord.payment_date ${_sortBy}
                LIMIT ${_limit}
                OFFSET ${(_page - 1) * _limit} `

      const findData = await db.sequelize.query(sql)
      const findDataReal = findData[0]

      return res.status(200).json({
        message: "Filtered",
        data: findDataReal,
        dataCount: dataCountReal.length,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = salesReport
