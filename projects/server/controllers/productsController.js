const db = require("../models")
const { Op } = require("sequelize")
const Product = db.Product
const Category = db.Category
const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const {
        CategoryId = "",
        _limit = 10,
        _page = 1,
        _sortBy = "id",
        _sortDir = "ASC",
      } = req.query
      if (_sortBy === "CategoryId") {
      }
      {
        if (!Number(CategoryId)) {
          const getAllProducts1 = await Product.findAndCountAll({
            where: {
              product_name: {
                [Op.like]: `%${req.query.product_name || ""}%`,
              },
            },
            include: [{ model: db.Category }],
            limit: Number(_limit),
            offset: (_page - 1) * _limit,
            order: [[_sortBy, _sortDir]],
          })
          return res.status(200).json({
            message: "Get All Product 1",
            data: getAllProducts1.rows,
            dataCount: getAllProducts1.count,
          })
        }
      }
      const getAllProducts2 = await Product.findAndCountAll({
        where: {
          product_name: {
            [Op.like]: `%${req.query.product_name || ""}%`,
          },
          CategoryId,
        },
        include: [{ model: db.Category }],
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [[_sortBy, _sortDir]],
      })
      return res.status(200).json({
        message: "Get All Product 2",
        data: getAllProducts2.rows,
        dataCount: getAllProducts2.count,
      })
      // TRIAL AND ERROR ========================================================
      // const { CategoryId = "", _sortBy = "id", _sortDir = "ASC" } = req.query
      // const page = parseInt(req.query.page) || 0
      // const limit = parseInt(req.query.limit) || 1
      // const search = req.query.search_query | ""
      // const offset = limit * page
      // if (CategoryId) {
      //   if (!Number(CategoryId)) {
      //     const result = await Product.findAll({
      //       where: {
      //         product_name: {
      //           [Op.like]: "%" + search + "%",
      //         },
      //       },
      //       include: [{ model: Category }],
      //       offset: offset,
      //       limit: limit,
      //       order: [[_sortBy, _sortDir]],
      //     })
      //     return res.status(200).json({
      //       message: "Get All Product",
      //       result: result,
      //     })
      //   }
      // }
      // const totalRows = await Product.count({
      //   where: {
      //     product_name: {
      //       [Op.like]: "%" + search + "%",
      //     },
      //     CategoryId,
      //   },
      //   include: [{ model: db.Category }],
      // })
      // const totalPage = Math.ceil(totalRows / limit)
      // const result = await Product.findAll({
      //   where: {
      //     product_name: {
      //       [Op.like]: "%" + search + "%",
      //     },
      //     CategoryId,
      //   },
      //   include: [{ model: db.Category }],
      //   offset: offset,
      //   limit: limit,
      //   order: [[_sortBy, _sortDir]],
      // })
      // return res.status(200).json({
      //   message: "Get All Product",
      //   result: result,
      //   page: page,
      //   limit: limit,
      //   totalRows: totalRows,
      //   totalPage: totalPage,
      // })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getProductsByID: async (req, res) => {
    try {
      const getProductsByID = await db.Product.findByPk(req.params.id, {
        include: [
          { model: db.Category },
          { model: db.ProductPicture },
          { model: db.ProductStock },
        ],
      })

      res.status(200).json({
        message: "Get Products By Id",
        data: getProductsByID,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.mesage,
      })
    }
  },
  getAllProductCategory: async (req, res) => {
    try {
      const findProductCategory = await Category.findAll()
      return res.status(200).json({
        message: "Get All Product Category",
        data: findProductCategory,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getProductCategoryId: async (req, res) => {
    try {
      const { id } = req.params
      const findProductCategoryId = await Category.findByPk(id)

      return res.status(200).json({
        message: `Get Product Category ${id}`,
        data: findProductCategoryId,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getProductsImage: async (req, res) => {
    try {
      const { id } = req.params

      const getProductsImage = await db.ProductPicture.findByPk(id)

      res.status(200).json({
        message: "Get Product Picture Data",
        data: getProductsImage,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = productsController
