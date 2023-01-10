const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

// const bcrypt = require("bcrypt") later merge with others

const {
  sequelize,
  Order,
  OrderItem,
  Status,
  ProductStock,
  Journal,
  JournalItem,
  JournalType,
} = db;

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { nameOrEmail, password } = req.body;

      const findUserAdmin = await db.User.findOne({
        where: {
          [Op.or]: {
            name: nameOrEmail,
            email: nameOrEmail,
            password: password,
          },
        },
      });
      if (findUserAdmin.RoleId == 3 || findUserAdmin.is_verified == false) {
        return res.status(400).json({
          msg: "User Unauthorized !",
        });
      }

      // later use this to compare hashed password

      // const validatePassword = bcrypt.compareSync(
      //   password,
      //   findUserAdmin.password
      // )

      if (!findUserAdmin.RoleId == 1 || !findUserAdmin.RoleId == 2) {
        return res.status(400).json({
          msg: "Role Admin Not Found ❌",
        });
      }

      return res.status(201).json({
        msg: "Admin Logged in ✅",
        data: findUserAdmin,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Server Error !" });
    }
  },
  sendOrder: async (req, res) => {
    try {
      // Get transaction id
      const { id } = req.body;

      // Get appropriate status
      const { id: statusId } = await Status.findOne({
        where: {
          status: {
            [Op.like]: "%dikirim%",
          },
        },
      });

      // Get current date
      const currentDate = moment().format();

      // Update transaction status
      await sequelize.transaction(async (t) => {
        await Order.update(
          { StatusId: statusId, sent_at: currentDate },
          {
            where: {
              id,
            },
            transaction: t,
          }
        );
      });

      return res.status(200).json({
        message: "Pesanan dikirim",
        status: "dikirim",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  cancelOrder: async (req, res) => {
    try {
      // Get transaction details
      const { id, warehouseId } = req.body;

      // Get appropriate order statuses for update
      const [sent, cancelled] = await Status.findAll({
        raw: true,
        where: {
          [Op.or]: [
            {
              status: {
                [Op.like]: "%dikirim%",
              },
            },
            {
              status: {
                [Op.like]: "%dibatalkan%",
              },
            },
          ],
        },
      });

      // Get order status
      const {
        Status: { status },
      } = await Order.findOne({
        where: {
          id,
        },
        attributes: ["StatusId"],
        include: [{ model: Status }],
      });

      // If the order items are sent abort cancellation
      if (status === sent.status) {
        return res.status(400).json({
          message: "Pesanan yang sudah dikirim tidak bisa dibatalkan",
        });
      }

      // Cancel order
      await sequelize.transaction(async (t) => {
        await Order.update(
          { StatusId: cancelled.id },
          {
            where: {
              id,
            },
            transaction: t,
          }
        );
      });

      // Get order items detail
      const orderItems = await OrderItem.findAll({
        raw: true,
        where: {
          OrderId: id,
        },
        order: [["ProductId", "ASC"]],
      });

      // Get nearest warehouse product stock for individual items
      const productIdList = orderItems.map((orderItem) => {
        const { ProductId } = orderItem;
        return ProductId;
      });

      const currentProductStocks = await ProductStock.findAll({
        raw: true,
        where: {
          [Op.and]: [
            {
              ProductId: {
                [Op.in]: productIdList,
              },
            },
            {
              WarehouseId: warehouseId,
            },
          ],
        },
        order: [["ProductId", "ASC"]],
      });

      // Return ordered items to the nearest warehouse
      const productStocksToUpdate = currentProductStocks.map(
        (currentProductStock, index) => {
          const stock =
            currentProductStock["stock"] + orderItems[index]["quantity"];
          return { ...currentProductStock, stock };
        }
      );

      await sequelize.transaction(async (t) => {
        await ProductStock.bulkCreate(productStocksToUpdate, {
          updateOnDuplicate: ["stock"],
          transaction: t,
        });
      });

      // Update journal
      const { type: cancellationJournalType } = await JournalType.findOne({
        raw: true,
        where: {
          name: {
            [Op.like]: "retur pembelian",
          },
        },
      });

      const journalItemsToUpdate = currentProductStocks.map(
        (currentProductStock, index) => {
          return {
            quantity: orderItems[index]["quantity"],
            stock_before: currentProductStock["stock"],
            stock_after:
              currentProductStock["stock"] + orderItems[index]["quantity"],
            JournalTypeId: cancellationJournalType,
            OrderId: orderItems[index]["OrderId"],
            ProductId: currentProductStock.ProductId,
            WarehouseId: warehouseId,
          };
        }
      );

      await sequelize.transaction(async (t) => {
        await Journal.create(
          {
            JournalItems: journalItemsToUpdate,
          },
          {
            include: [JournalItem],
            transaction: t,
          }
        );
      });

      // Send successful response
      return res.status(200).json({
        message: "Pesanan dibatalkan",
        status: "dibatalkan",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

module.exports = adminController;
