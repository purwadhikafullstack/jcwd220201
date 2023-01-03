const { Op } = require("sequelize")
const db = require("../models")
const WarehousesUser = db.WarehousesUser
const Warehouse = db.Warehouse
const User = db.User

const warehouseUserController = {
  createUserHouse: async (req, res) => {
    try {
      const findUser = await db.User.findByPk(req.body.UserId)
      if (!findUser) {
        throw new Error("User tidak ditemukan")
      }

      const findWarehouseId = await Warehouse.findByPk(req.body.WarehouseId)
      if (!findWarehouseId) {
        throw new Error("Warehouse tidak ditemukan")
      }

      const findUserById = await db.WarehousesUser.findOne({
        where: { UserId: { [Op.like]: findUser.id } },
      })
      if (findUserById) {
        return res.status(400).json({
          message: "UserId telah ada",
        })
      }

      if (findUser.RoleId !== 2) {
        return res.status(400).json({
          message: "Hanya admin warehouse",
        })
      } else {
        const newWarehouseUser = await WarehousesUser.create({
          UserId: findUser.id,
          WarehouseId: findWarehouseId.id,
        })
        return res.status(200).json({
          message: "Warehouse user telah ditambahkan",
          data: newWarehouseUser,
        })
      }
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllWareUser: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "DESC" } = req.query

      const findAllWareUser = await WarehousesUser.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["UserId", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Warehouse User",
        data: findAllWareUser.rows,
        dataCount: findAllWareUser.count,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
  updateWareUserById: async (req, res) => {
    try {
      const { id } = req.params

      await db.WarehousesUser.update(req.body, {
        where: {
          id: id,
        },
      })

      return res.status(200).json({
        message: "Warehouse user telah update",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },

  deleteWareUserById: async (req, res) => {
    try {
      const { id } = req.params

      const wareUserById = await WarehousesUser.findOne({
        where: {
          id,
        },
      })

      if (!wareUserById) {
        return res.status(400).json({
          message: "User Warehouse not found",
        })
      }

      await WarehousesUser.destroy({
        where: {
          id,
        },
      })

      return res.status(200).json({
        message: "Warehouse user telah  dihapus",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllWarehouses: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllWarehouse = await Warehouse.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["id", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Warehouses Data",
        data: findAllWarehouse.rows,
        dataCount: findAllWarehouse.count,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}

module.exports = warehouseUserController
