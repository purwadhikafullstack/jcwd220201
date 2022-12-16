const db = require("../models")
const { Op } = require("sequelize")

const Category = db.Category

module.exports = {
  createCategory: async (req, res) => {
    try {
      const { category } = req.body

      const checkCategory = await Category.findOne({
        where: { category: { [Op.like]: category } },
      })

      if (checkCategory) {
        return res.status(302).json({
          message: "Category Already Exist",
        })
      }

      const newCategory = await Category.create({
        category: category,
      })

      return res.status(201).json({
        message: "Category Created",
        data: newCategory,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const { _limit = 6, _page = 1, _sortDir = "ASC" } = req.query

      const findAllCategory = await Category.findAndCountAll({
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["category", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Categories",
        data: findAllCategory.rows,
        dataCount: findAllCategory.count,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params

      const categoryById = await Category.findOne({
        where: {
          id,
        },
      })

      if (!categoryById) {
        return res.status(400).json({
          message: "Category not found",
        })
      }

      return res.status(200).json({
        message: "Get Category by ID",
        data: categoryById,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  updateCategoryById: async (req, res) => {
    try {
      const { id } = req.params

      await Category.update({ ...req.body }, { where: { id: id } })

      return res.status(200).json({
        message: "Category Data Updated",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },

  deleteCategoryById: async (req, res) => {
    try {
      const { id } = req.params

      const categoryById = await Category.findOne({
        where: {
          id,
        },
      })

      if (!categoryById) {
        return res.status(400).json({
          message: "Category not found",
        })
      }

      await Category.destroy({
        where: {
          id,
        },
      })

      return res.status(200).json({
        message: "Category Data Deleted",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
}
