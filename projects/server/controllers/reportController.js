const moment = require("moment")
const { Op } = require("sequelize")
const { sequelize } = require("../models")
const db = require("../models")

const salesReport = {
  getTodayOrder: async (req, res) => {
    const TODAY_START = moment().startOf("day")
    const NOW = moment().format("YYYY-MM-DD HH:mm")
    try {
      const todayOrder = await db.Order.count({
        where: {
          payment_date: {
            [Op.gt]: TODAY_START,
            [Op.lt]: NOW,
          },
          StatusId: {
            [Op.ne]: 5,
          },
        },
      })

      const yesterdayOrder = await db.Order.count({
        where: {
          payment_date: {
            [Op.gt]: moment(TODAY_START).subtract(1, "day"),
            [Op.lt]: TODAY_START,
          },
          StatusId: {
            [Op.ne]: 5,
          },
        },
      })

      const todayAndYesterdayOrder = {
        todayOrder,
        yesterdayOrder,
      }

      return res.status(200).json({
        message: "transaksi ditemukan",
        data: todayAndYesterdayOrder,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  highRevenue: async (req, res) => {
    try {
      const { _sortDir = "DESC" } = req.query
      let products = await db.Order.findAll({
        attributes: ["id", "total_price"],
        order: [["total_price", _sortDir]],

        where: {
          StatusId: 5,
        },
      })
      return res.status(200).json({
        message: "high revenue",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  lowRevenue: async (req, res) => {
    try {
      const { _sortDir = "ASC" } = req.query
      let products = await db.Order.findAndCountAll({
        attributes: ["id", "total_price"],
        order: [["total_price", _sortDir]],

        where: {
          StatusId: 5,
        },
      })
      return res.status(200).json({
        message: "Low revenue",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllTransactions: async (req, res) => {
    try {
      let products = await db.Order.findAll({
        attributes: ["id", "updatedAt", "StatusId", "total_price"],
        where: {
          StatusId: 5,
        },
        include: [
          {
            model: db.OrderItem,
            include: [{ model: db.Product }],
          },

          {
            model: db.User,
          },
        ],
        order: [["id", "DESC"]],
      })

      return res.status(200).json({
        message: "get All transaction",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getOrderItem: async (req, res) => {
    try {
      let products = await db.OrderItem.findAll({
        attributes: ["ProductId", "total_price"],

        include: [
          {
            model: db.Product,
          },
        ],
        order: [["total_price", "DESC"]],
      })

      return res.status(200).json({
        message: "get All transaction",
        data: products,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  getReportWithQuery: async (req, res) => {
    const CategoryId = req.query.CategoryId
    const WarehouseId = req.query.WarehouseId
    const {
      payment_date,
      product_name = "",
      category = "",
      _limit = 10,
      _page = 1,
    } = req.query

    console.log("ct", CategoryId)
    console.log("wr", WarehouseId)
    console.log("mnth", payment_date)
    console.log("pr", product_name)
    console.log("cname", category)
    try {
      const { _sortBy = "" } = req.query
      let sql = `SELECT ord.WarehouseId, pr.CategoryId, pr.id AS productId, ct.category, pr.product_name, pr.description, ord_items.total_price AS price, ord_items.quantity,
                    ord_items.total_price * ord_items.quantity AS total, wr.warehouse_name, ord.payment_date
                    FROM orderitems AS ord_items
                    JOIN orders AS ord ON ord.id = ord_items.OrderId
                    JOIN products AS pr ON pr.id = ord_items.ProductId
                    JOIN categories AS ct ON ct.id = pr.CategoryId
                    JOIN warehouse as wr ON wr.id = ord.WarehouseId `

      if (WarehouseId && CategoryId && payment_date) {
        sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} AND MONTH(ord.payment_date)=${payment_date} `
      } else if (WarehouseId && CategoryId) {
        sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} `
      } else if (WarehouseId && payment_date) {
        sql += `WHERE WarehouseId=${WarehouseId} AND MONTH(ord.payment_date)=${payment_date} `
      } else if (CategoryId && payment_date) {
        sql += `WHERE CategoryId=${CategoryId} AND MONTH(ord.payment_date)=${payment_date} `
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
        data: findDataReal[0],
        dataCount: dataCountReal[0].length,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = salesReport
