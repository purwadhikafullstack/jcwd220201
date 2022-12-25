const db = require("../models")
const fs = require("fs")
const emailer = require("../lib/emailer")
const moment = require("moment")

const handlebars = require("handlebars")

const paymentController = {
  getPayment: async (req, res) => {
    try {
      let allOrder = await db.Order.findAll({
        attributes: [
          "id",
          "payment_date",
          "total_price",
          "StatusId",
          "UserId",
          "shipping_cost",
        ],
        include: [
          {
            model: db.OrderItem,
            include: [{ model: db.Product, attributes: ["product_name"] }],
          },
          {
            model: db.Courier,
          },
          {
            model: db.User,
          },

          {
            model: db.Status,
          },
        ],
        order: [["id", "ASC"]],
      })

      return res.status(200).json({
        message: "Get all user order payment",
        data: allOrder,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getPaymentById: async (req, res) => {
    try {
      const findOrderById = await db.Order.findOne({
        where: {
          id: req.params.id,
        },
        attribute: ["payment_date", "total_price", "UserId"],
        include: [
          {
            model: db.OrderItem,
            include: [db.Product],
          },
          {
            model: db.Courier,
          },
          {
            model: db.User,
          },

          {
            model: db.Status,
          },
        ],
        order: [["id", "ASC"]],
      })

      return res.status(200).json({
        message: "Get all user order",
        data: findOrderById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  findPaymentStatus: async (req, res) => {
    try {
      const status = await db.Order.findAll({
        where: {
          attribute: { StatusId: req.body.StatusId },
        },
      })

      return res.status(200).json({
        message: "find status",
        data: status,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
    }
  },
  confirmPayment: async (req, res) => {
    try {
      const { id } = req.params
      const findOrder = await db.Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "Order is not found",
        })
      }

      await db.Order.update(
        {
          StatusId: 3,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findApproveTrasanction = await db.Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: db.User }],
      })

      const totalBill = findApproveTrasanction.total_price
      const paymentDate = moment(findApproveTrasanction.payment_date).format(
        "dddd, DD MMMM YYYY, HH:mm:ss"
      )
      const transactionLink = `http://localhost:3000/transaction-list`

      const rawHTML = fs.readFileSync("templates/payment/approve.html", "utf-8")

      const compiledHTML = handlebars.compile(rawHTML)

      const htmlResult = compiledHTML({
        email: findApproveTrasanction.User.email,
        totalBill: totalBill.toLocaleString(),

        dateAndTime: `${paymentDate} WIB`,
        transactionListLink: transactionLink,
      })

      await emailer({
        to: findApproveTrasanction.User.email,
        html: htmlResult,
        subject: "Payment Verified",
        text: "Thank You",
      })
      return res.status(200).json({
        message: "confirm payment success",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: err.message,
      })
    }
  },
  rejectPayment: async (req, res) => {
    try {
      const { id } = req.params

      const findOrder = await db.Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "order not found",
        })
      }

      await db.Order.update(
        {
          StatusId: 2,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findOrderId = await db.Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: db.User }],
      })

      const link = `http://localhost:3000/payment/wired/${findOrderId.id}`

      const template = fs.readFileSync(
        "./templates/payment/reject.html",
        "utf-8"
      )

      const compiledHTML = handlebars.compile(template)

      const htmlResult = compiledHTML({
        email: findOrderId.User.email,
        link,
      })

      await emailer({
        to: findOrderId.User.email,
        subject: "Reject Payment",
        html: htmlResult,
        text: "Please reupload your payment proof",
      })

      return res.status(200).json({
        message: "Payment Rejected",
        data: findOrderId,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = paymentController
