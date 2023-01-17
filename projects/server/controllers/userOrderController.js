const { Op } = require("sequelize")
const db = require("../models")
const Order = db.Order
const OrderItem = db.OrderItem
const User = db.User
const Status = db.Status
const userOrderController = {
  getAllUserOrder: async (req, res) => {
    const { _limit = 10, _page = 1 } = req.query
    const WarehouseId = req.query.WarehouseId
    try {
      let query = `SELECT ord.WarehouseId, us.id, ord.id, us.name, prod.product_name, ori.quantity, ori.total_price, st.status, ware.warehouse_name
      from Orders as ord
      JOIN Users as us ON us.id = ord.UserId
      JOIN OrderItems as ori ON ori.OrderId = ord.id
      JOIN Products as prod ON prod.id = ori.ProductId
      JOIN Statuses as st ON st.id = ord.StatusId 
      JOIN Warehouse as ware ON ware.id = ord.WarehouseId `
      if (WarehouseId) {
        query += `WHERE ord.WarehouseId=${WarehouseId} `
      }
      query += `ORDER by ord.id DESC
                LIMIT ${_limit}
                OFFSET ${(_page - 1) * _limit}
                `
      const result = await db.sequelize.query(query)

      const count = await db.sequelize.query(query)

      res.status(200).json({
        message: "All User Order",
        data: result[0],
        dataCount: count[0].length,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  },

  cancelOrderUser: async (req, res) => {
    try {
      const findStatus = await db.Order.findOne(req.body.StatusId)

      if (findStatus.StatusId !== 1) {
        return res.status(400).json({
          message: "Status tidak dapat dibatalkan",
        })
      } else {
        await db.Order.update(
          {
            StatusId: 6,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )

        return res.status(200).json({
          message: "Pesanan dibatalkan",
          data: findStatus,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = userOrderController
