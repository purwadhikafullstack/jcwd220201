const {
  Order,
  ProductStock,
  Product,
  Address,
  Status,
  OrderItem,
  User,
  Warehouse,
  Stock,
  sequelize,
} = require("../models")
const fs = require("fs")
const emailer = require("../lib/emailer")
const moment = require("moment")

const getWarehousesInfo = require("../lib/checkout/getWarehousesInfo")
const compareWarehouseDistances = require("../lib/checkout/compareWarehouseDistances")

const handlebars = require("handlebars")
const { Op } = require("sequelize")

const paymentController = {
  confirmPayment: async (req, res) => {
    try {
      const { id } = req.params
      const { WarehouseId, stock, ProductId } = req.body

      const findOrder = await Order.findOne({
        include: [{ model: Warehouse }],
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "Order is not found",
        })
      }

      // Get shipping address
      const shippingAddress = await Address.findOne({
        where: {
          is_selected: true,
        },
      })

      // Get shipping address longitude and latitude
      const [latitude, longitude] = shippingAddress.pinpoint.split(", ")
      const shippingAddressCoordinates = {
        latitude: Number(latitude),
        longitude: Number(longitude),
      }

      // Get warehouse addresses
      const warehousesInfo = await getWarehousesInfo()

      // Sort warehouse by distance to shipping address
      const sortedWarehouse = compareWarehouseDistances(
        shippingAddressCoordinates,
        warehousesInfo
      )

      const [nearestWarehouse] = sortedWarehouse.splice(0, 1)
      const nearestBranches = sortedWarehouse

      const orderItems = await OrderItem.findAll({
        where: {
          OrderId: findOrder.id,
        },
        include: [{ model: Product }],
      })

      // Check overall product availability
      for (let item of orderItems) {
        const { ProductId, quantity } = item

        const stockDetails = await ProductStock.findAll({
          where: {
            ProductId,
          },
        })

        const totalStock = stockDetails.reduce((accumulator, current) => {
          return accumulator + current.stock
        }, 0)

        // Cancel order if one of the product is not available
        if (totalStock < quantity) {
          return res.status(422).json({
            message: "Transaksi gagal",
            description: "Ada barang yang tidak tersedia di keranjang Anda",
          })
        }
      }

      // Check products availability in the nearest warehouse

      for (let item of orderItems) {
        const { ProductId, quantity } = item

        // Get available stock from the nearest warehouse
        const { stock } = await ProductStock.findOne({
          raw: true,
          where: {
            [Op.and]: [
              { ProductId },
              { WarehouseId: nearestWarehouse.warehouseInfo.id },
            ],
          },
        })

        // Make a request to nearest branches if additional stock is needed
        const requestItemsForm = []

        if (stock < quantity) {
          // Calculate items needed
          let itemsNeeded = !stock ? quantity : quantity - stock

          // Check stock availability from nearest branches
          for (let branch of nearestBranches) {
            const { stock: nearestBranchStock } = await ProductStock.findOne({
              raw: true,
              where: {
                [Op.and]: [
                  { ProductId },
                  { WarehouseId: branch.warehouseInfo.id },
                ],
              },
            })

            const time = moment().format()

            /*
              Continue checking from subsequent nearest branches if stock not available
              from the current nearest branch
            */

            if (!nearestBranchStock) {
              continue
            }

            /*
              Create request draft consisting of available items if available stock is less than
              or equal to items needed
            */

            if (nearestBranchStock <= itemsNeeded) {
              requestItemsForm.push({
                ProductId,
                quantity: nearestBranchStock,
                StockRequest: {
                  date: time,
                  is_approved: true,
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              })

              // update jumlah klo = 0, kalau < stock update 0
              // stock >= update stock semula dikurangi item needed

              itemsNeeded -= nearestBranchStock

              if (!itemsNeeded) {
                break
              }

              continue
            }

            /*
              Create request draft consisting of the number of items needed if available stock
              is greater than items needed
            */

            if (nearestBranchStock >= itemsNeeded) {
              requestItemsForm.push({
                ProductId,
                quantity: itemsNeeded,
                StockRequest: {
                  date: time,
                  is_approved: true,
                  FromWarehouseId: nearestWarehouse.warehouseInfo.id,
                  ToWarehouseId: branch.warehouseInfo.id,
                },
              })

              break
            }
          }
        }
      }

      const { id: statusId } = await Status.findOne({
        where: {
          status: "diproses",
        },
      })

      await Order.update(
        {
          StatusId: statusId,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findApproveTrasanction = await Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: User }],
      })

      const totalBill = findApproveTrasanction.total_price
      const paymentDate = moment(findApproveTrasanction.payment_date).format(
        "dddd, DD MMMM YYYY, HH:mm:ss"
      )
      const transactionLink = `process.env.DOMAIN_NAME/transaction-list`

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
        attachments: [
          {
            filename: "logo.png",
            path: `${__dirname}/../templates/images/logo.png`,
            cid: "logo",
          },
        ],
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

      const findOrder = await Order.findOne({
        where: {
          id: id,
        },
      })

      if (!findOrder) {
        return res.status(400).json({
          message: "order not found",
        })
      }

      const { id: statusId } = await Status.findOne({
        where: {
          status: "menunggu pembayaran",
        },
      })

      await Order.update(
        {
          StatusId: statusId,
        },
        {
          where: {
            id: id,
          },
        }
      )

      const findOrderId = await Order.findOne({
        where: {
          id: id,
        },
        include: [{ model: User }],
      })

      const link = `process.env.DOMAIN_NAME/payment/wired/${findOrderId.id}`

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
        attachments: [
          {
            filename: "logo.png",
            path: `${__dirname}/../templates/images/logo.png`,
            cid: "logo",
          },
        ],
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
