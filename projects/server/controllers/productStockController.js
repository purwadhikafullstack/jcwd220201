const { Op } = require("sequelize")
const pagination = require("../lib/stock/pagination")
const paginationData = require("../lib/stock/paginationData")
const paginationData2 = require("../lib/stock/paginationData2")
const db = require("../models")
const Warehouse = db.Warehouse
const User = db.User
const WarehousesUser = db.WarehousesUser
const ProductStock = db.ProductStock
const Product = db.Product
const ProductPicture = db.ProductPicture
const Category = db.Category

// Journal Db
const Journal = db.Journal
const JournalItem = db.JournalItem
const JournalType = db.JournalType

const productStockController = {
  // Admin
  getAllWarehouse: async (req, res) => {
    try {
      // Check Role Admin
      const findAdminByRole = await User.findByPk(req.user.id)

      if (findAdminByRole.RoleId !== 1) {
        return res.status(400).json({
          message:
            "Hanya Admin yang bisa melihat Fitur ini, silahkan Login sebagai Admin",
        })
      }

      const { search } = req.query

      const searchWarehouse = search ? `%${search}%` : "%%"

      const page = parseInt(req.query.page)

      const { LIMIT, OFFSET } = pagination(page)

      const findAllWarehouse = await Warehouse.findAndCountAll({
        limit: LIMIT,
        offset: OFFSET,
        order: [["id", "ASC"]],
        where: { warehouse_name: { [Op.like]: searchWarehouse } },

        attributes: { exclude: ["pinpoint", "createdAt", "updatedAt"] },
        include: [
          {
            model: WarehousesUser,
            include: [{ model: User, attributes: ["name"] }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      })

      const result = paginationData(findAllWarehouse, page, LIMIT)

      return res.status(200).json({
        message: "Data Warehouse",
        data: result,
      })

      // THIS METHOD IS WORKING ON PAGINATION
      //   const findAdminByRole = await User.findByPk(req.user.id)

      //   if (findAdminByRole.RoleId !== 1) {
      //     return res.status(400).json({
      //       message:
      //         "Hanya Admin yang bisa melihat Fitur ini, silahkan Login sebagai Admin",
      //     })
      //   }

      //   const page = parseInt(req.query.page) || 0
      //   const limit = parseInt(req.query.limit) || 1
      //   const search = req.query.search_query || ""
      //   const offset = limit * page
      //   const totalRows = await Warehouse.count({
      //     where: { warehouse_name: { [Op.like]: "%" + search + "%" } },
      //     attributes: { exclude: ["pinpoint", "createdAt", "updatedAt"] },
      //     include: [
      //       {
      //         model: WarehousesUser,
      //         include: [{ model: User, attributes: ["name"] }],
      //         attributes: { exclude: ["createdAt", "updatedAt"] },
      //       },
      //     ],
      //   })
      //   const totalPage = Math.ceil(totalRows / limit)
      //   const result = await Warehouse.findAll({
      //     where: { warehouse_name: { [Op.like]: "%" + search + "%" } },
      //     attributes: { exclude: ["pinpoint", "createdAt", "updatedAt"] },
      //     include: [
      //       {
      //         model: WarehousesUser,
      //         include: [{ model: User, attributes: ["name"] }],
      //         attributes: { exclude: ["createdAt", "updatedAt"] },
      //       },
      //     ],
      //     offset: offset,
      //     limit: limit,
      //     order: [["id", "DESC"]],
      //   })

      //   return res.status(200).json({
      //     message: "Data Warehouse",
      //     result: result,
      //     page: page,
      //     limit: limit,
      //     totalRows: totalRows,
      //     totalPage: totalPage,
      //   })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ mesage: err.message })
    }
  },
  // Warehouse Admin
  getProductStockWarehouse: async (req, res) => {
    try {
      const { search } = req.query
      const { id } = req.params

      const findAdminByRole = await User.findByPk(req.user.id)

      if (findAdminByRole.RoleId !== 1 && findAdminByRole.RoleId !== 2) {
        return res.status(400).json({
          message: "Hanya Warehouse Admin & Admin yang bisa melihat Fitur ini",
        })
      }

      const searchProduct = search ? `%${search}%` : "%%"

      const page = parseInt(req.query.page)

      const { LIMIT, OFFSET } = pagination(page)

      const findWarehouseAdmin = await ProductStock.findAndCountAll({
        limit: LIMIT,
        offset: OFFSET,
        subQuery: false,
        where: { WarehouseId: id },
        include: [
          {
            model: Product,
            where: { product_name: { [Op.like]: searchProduct } },
            include: [{ model: Category }, { model: ProductPicture }],
          },
        ],
        order: [[{ model: Product }, "id", "ASC"]],
      })
      const result = paginationData2(findWarehouseAdmin, page, LIMIT)

      return res
        .status(200)
        .json({ message: "Data Warehouse Admin", data: result })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }

    // Later Try This Method
    //   const { id } = req.params

    //   const findAdminByRole = await User.findByPk(req.user.id)

    //   if (findAdminByRole.RoleId !== 1 && findAdminByRole.RoleId !== 2) {
    //     return res.status(400).json({
    //       message: "Hanya Warehouse Admin & Admin yang bisa melihat Fitur ini",
    //     })
    //   }

    //   const page = parseInt(req.query.page) || 0
    //   const limit = parseInt(req.query.limit) || 1
    //   const search = req.query.search_query || ""
    //   const offset = limit * page
    //   const totalRows = await ProductStock.count({
    //     where: { WarehouseId: id },
    //     include: [
    //       {
    //         model: Product,
    //         where: { product_name: { [Op.like]: "%" + search + "%" } },
    //         include: [{ model: Category }, { model: ProductPicture }],
    //       },
    //     ],
    //   })
    //   const totalPage = Math.ceil(totalRows / limit)
    //   const result = await ProductStock.findAll({
    //     where: { WarehouseId: id },
    //     include: [
    //       {
    //         model: Product,
    //         where: { product_name: { [Op.like]: "%" + search + "%" } },
    //         include: [{ model: Category }, { model: ProductPicture }],
    //       },
    //     ],
    //     offset: offset,
    //     limit: limit,
    //     subQuery: false,
    //     order: [[{ model: Product }, "id", "ASC"]],
    //   })

    //   return res.status(200).json({
    //     message: "Data Warehouse Admin",
    //     result: result,
    //     page: page,
    //     limit: limit,
    //     totalRows: totalRows,
    //     totalPage: totalPage,
    //   })
    // } catch (err) {
    //   console.log(err)
    //   return res.status(500).json({ message: err.message })
    // }
  },
  getAllCategory: async (req, res) => {
    try {
      const allCategory = await Category.findAll()

      return res
        .status(200)
        .json({ message: "Semua Data Kategori", data: allCategory })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ mesage: err.message })
    }
  },
  createStock: async (req, res) => {
    try {
      const { stock } = req.body
      const { id } = req.params

      const findAdminByRole = await User.findByPk(req.user.id)
      if (findAdminByRole.RoleId !== 1) {
        return res.status(400).json({
          message:
            "Hanya Admin yang bisa melihat Fitur ini, silahkan Login sebagai Admin",
        })
      }

      const findWarehouse = await Warehouse.findByPk(req.body.WarehouseId)
      if (!findWarehouse) {
        return res.status(400).json({ message: "Warehouse Tidak Ditemukan" })
      }

      const findProduct = await Product.findByPk(req.body.ProductId)

      if (!findProduct) {
        return res.status(400).json({ message: "Produk Tidak Ditemukan" })
      }

      const validateProduct = await ProductStock.findOne({
        where: { WarehouseId: req.body.WarehouseId },
      })

      if (validateProduct) {
        return res.status(400).json({
          message: "Produk telah ada , tidak bisa menambah produk yang sama",
        })
      }
      const createStock = await ProductStock.create({
        stock,
        ProductId: findProduct.id,
        WarehouseId: findWarehouse.id,
      })

      const findStock = await ProductStock.findByPk(createStock.id)
      const stock_after = findStock.dataValues.stock

      const createJournal = await Journal.create(id)
      const checkJournalType = await JournalType.findOne({
        where: { name: "pembuatan stok" },
      })
      await JournalItem.create({
        quantity: stock_after,
        stock_after: findStock.dataValues.stock,
        stock_before: 0,
        JournalId: createJournal.id,
        JournalTypeId: checkJournalType.id,
        ProductId: findStock.ProductId,
        WarehouseId: findStock.WarehouseId,
      })

      return res
        .status(200)
        .json({ message: "Stok Berhasil Dibuat", data: createStock })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  },
  updateProductStock: async (req, res) => {
    try {
      const { id } = req.params
      const { stock } = req.body
      const findAdminByRole = await User.findByPk(req.user.id)

      if (findAdminByRole.RoleId !== 1 && findAdminByRole.RoleId !== 2) {
        return res.status(400).json({
          message: "Hanya Admin & Warehouse Admin bisa akses Fitur ini!",
        })
      }

      const findStock1 = await ProductStock.findByPk(id)

      await ProductStock.update(
        { stock },
        { where: { id: id }, include: [{ model: Product }] }
      )

      const findStock2 = await ProductStock.findByPk(id)
      const stock_before = findStock1.dataValues.stock
      const stock_after = findStock2.dataValues.stock

      const createJournal = await Journal.create(id)
      const checkJournalType = await JournalType.findOne({
        where: { name: "pembaruan stok" },
      })
      await JournalItem.create({
        quantity: stock_after,
        stock_after: findStock2.dataValues.stock,
        stock_before: findStock1.dataValues.stock,
        JournalId: createJournal.id,
        JournalTypeId: checkJournalType.id,
        ProductId: findStock2.ProductId,
        WarehouseId: findStock2.WarehouseId,
      })

      return res
        .status(200)
        .json({ message: "Stock Berhasil Diperbaharui", data: findStock2 })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  },
  deleteProductStock: async (req, res) => {
    try {
      const { id } = req.params

      const findAdminByRole = await User.findByPk(req.user.id)

      if (findAdminByRole.RoleId !== 1 && findAdminByRole.RoleId !== 2) {
        return res.status(400).json({
          message: "Hanya Admin & Warehouse Admin bisa akses Fitur ini! ",
        })
      }

      const findStock1 = await ProductStock.findByPk(id)

      await ProductStock.update({ stock: 0 }, { where: { id: id } })

      const findStock2 = await ProductStock.findByPk(id)

      const stock_before = findStock1.dataValues.stock
      const stock_after = findStock2.dataValues.stock

      // const stockCheck = (stock_before, stock_after) => {
      //   const count = Math.max(stock_before, stock_after)

      //   if (count === stock_before) {
      //     return false
      //   } else {
      //     return true
      //   }
      // }

      const createJournal = await Journal.create(id)
      const checkJournalType = await JournalType.findOne({
        where: { name: "hapus stok" },
      })

      await JournalItem.create({
        quantity: stock_after,
        stock_after: findStock2.dataValues.stock,
        stock_before: findStock1.dataValues.stock,
        JournalId: createJournal.id,
        JournalTypeId: checkJournalType.id,
        ProductId: findStock2.ProductId,
        WarehouseId: findStock2.WarehouseId,
      })

      return res
        .status(200)
        .json({ message: "Stok Terhapus", data: findStock2 })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  },
}

module.exports = productStockController
