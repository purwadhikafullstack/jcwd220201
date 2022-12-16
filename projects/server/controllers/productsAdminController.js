const { sequelize } = require("../models")
const db = require("../models")
ProductPicture = db.ProductPicture
const fs = require("fs")

const productAdminController = {
  createProducts: async (req, res) => {
    try {
      const findAdmin = await db.User.findByPk(req.user.id)

      if (findAdmin.RoleId === 2) {
        return res.status(400).json({
          message: "Admin unauthorized",
        })
      }
      const findCategoryId = await db.Category.findByPk(req.body.CategoryId)

      if (!findCategoryId) {
        throw new Error("Category tidak ditemukan")
      }

      const findProductByName = await db.Product.findOne({
        where: {
          product_name: req.body.product_name || "".toUpperCase(),
        },
      })

      if (findProductByName) {
        return res.status(400).json({
          message: "Nama Produk telah ada",
        })
      } else {
        const createProduct = await db.Product.create({
          product_name: req.body.product_name,
          description: req.body.description,
          price: req.body.price,
          CategoryId: findCategoryId.id,
          weight: req.body.weight,
          CategoryId: findCategoryId.id,
        })

        const files = req.files
        let img_path = []

        img_path = files.map((item) => item.filename)

        const productId = createProduct.id

        console.log(productId)
        const newProductImg = img_path.map((item) => {
          return {
            product_picture: item,
            product_id: productId,
            ProductId: productId,
          }
        })

        console.log(newProductImg)
        await db.ProductPicture.bulkCreate(newProductImg)

        const foundProductById = await db.Product.findByPk(createProduct.id, {
          include: { all: true },
        })

        return res.status(200).json({
          message: "Produk telah ditambahkan",
          data: foundProductById,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const { _limit = 10, _page = 1, _sortDir = "DESC" } = req.query

      const findAllProducts = await db.Product.findAndCountAll({
        include: { all: true },
        limit: Number(_limit),
        offset: (_page - 1) * _limit,
        order: [["id", _sortDir]],
      })

      return res.status(200).json({
        message: "Get All Product",
        data: findAllProducts.rows,
        dataCount: findAllProducts.count,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  updateProductsByAdmin: async (req, res) => {
    try {
      const findAdmin = await db.User.findByPk(req.user.id)

      if (findAdmin.RoleId === 3 || findAdmin.RoleId === 2) {
        return res.status(400).json({
          message: "Admin unauthorized",
        })
      }

      await db.Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      })

      return res.status(200).json({
        message: "Produk telah di update",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getProductById: async (req, res) => {
    try {
      const findProductById = await db.Product.findOne({
        where: {
          id: req.params.id,
        },
        include: [db.ProductPicture],
      })

      return res.status(200).json({
        message: "Get Product By Id",
        data: findProductById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getImageById: async (req, res) => {
    try {
      const { id } = req.params
      const findImageById = await db.ProductPicture.findAll({
        where: { ProductId: id },
      })

      return res.status(200).json({
        message: "Get Image By Id",
        data: findImageById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteProduct: async (req, res) => {
    const findAdmin = await db.User.findByPk(req.user.id)

    if (findAdmin.RoleId === 3 || findAdmin.RoleId === 2) {
      return res.status(400).json({
        message: "Admin unauthorized",
      })
    }

    const path = "public/"

    const fileName = await db.ProductPicture.findAll({
      where: {
        ProductId: req.params.id,
      },
    })

    try {
      await db.Product.destroy({
        where: {
          id: req.params.id,
        },
      })
      for (let i = 0; i < fileName.length; i++) {
        fs.unlinkSync(path + fileName[i].product_picture)
      }

      return res.status(200).json({
        message: "Produk telah dihapus",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteProductPicture: async (req, res) => {
    const findAdmin = await db.User.findByPk(req.user.id)

    if (findAdmin.RoleId === 2) {
      return res.status(400).json({
        message: "Admin unauthorized",
      })
    }
    const path = "public/"

    const fileName = await db.ProductPicture.findOne({
      where: {
        id: req.params.id,
      },
    })

    try {
      await db.ProductPicture.destroy({
        where: {
          id: req.params.id,
        },
      })

      fs.unlinkSync(path + fileName.product_picture)

      return res.status(200).json({
        message: "Foto produk berhasil dihapus",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllImage: async (req, res) => {
    try {
      const findAllImages = await db.ProductPicture.findAll({
        include: [{ model: db.Product }],
        where: {
          ...req.query,
        },
      })

      return res.status(200).json({
        message: "Get All Product Images",
        data: findAllImages,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  createImages: async (req, res) => {
    const findAdmin = await db.User.findByPk(req.user.id)

    if (findAdmin.RoleId === 2) {
      return res.status(400).json({
        message: "Admin unauthorized",
      })
    }
    try {
      await db.Product.findOne({
        where: {
          id: req.params.id,
        },
      })
      console.log(req.file)
      const createImg = await db.ProductPicture.create({
        product_picture: req.file.filename,
        ProductId: req.params.id,
      })

      return res.status(200).json({
        message: "Post new product image",
        data: createImg,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = productAdminController
