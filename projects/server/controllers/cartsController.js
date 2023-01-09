const db = require("../models")

const cartController = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, quantity } = req.body

      const findProductsCart = await db.Cart.findOne({
        where: {
          ProductId: ProductId,
        },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })

      const findProductStockId = await db.Product.findByPk(ProductId, {
        include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
      })

      const stock = findProductStockId.ProductStocks.map((val) => val.stock)
      let subtotal = 0

      for (let i = 0; i < stock.length; i++) {
        subtotal += Number(stock[i])
      }

      const totalStock = subtotal

      if (totalStock === 0) {
        return res.status(400).json({
          message: "Stok Produk Habis",
        })
      }

      if (!findProductsCart && quantity > totalStock) {
        return res.status(400).json({
          message: "Stok Produk Habis",
        })
      }

      if (!findProductsCart) {
        const addProductCart = await db.Cart.create({
          UserId: req.user.id,
          ProductId: ProductId,
          quantity: quantity,
        })

        const findProductItemInCart = await db.Cart.findByPk(
          addProductCart.id,
          {
            include: [
              {
                model: db.Product,
                include: [
                  { model: db.ProductPicture },
                  { model: db.ProductStock },
                ],
              },
            ],
          }
        )

        return res.status(200).json({
          message: "Add Product to Cart ",
          data: findProductItemInCart,
        })
      }
      const cartStock = findProductsCart.Product.ProductStocks.map(
        (val) => val.stock
      )

      let cartTotal = 0

      for (let i = 0; i < cartStock.length; i++) {
        cartTotal += Number(cartStock[i])
      }

      const totalStockCart = cartTotal
      const cartItem = findProductsCart.quantity

      if (totalStockCart === 0 || totalStockCart < quantity) {
        return res.status(400).json({
          message: "Stok Produk Habis",
        })
      }

      if (totalStockCart === 0 || totalStockCart < cartItem + quantity) {
        return res.status(400).json({
          message: "Stok Produk Habis",
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllMyCartItems: async (req, res) => {
    try {
      const getUserCartItem = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
        order: [["createdAt", "DESC"]],
      })

      return res.status(200).json({
        message: "Products in Cart!",
        data: getUserCartItem,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getCartProductById: async (req, res) => {
    try {
      const { ProductId } = req.params
      const getCartProductById = await db.Cart.findOne({
        where: { ProductId },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })
      return res.status(200).json({
        message: "Get Product Cart By Id",
        data: getCartProductById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getCartById: async (req, res) => {
    try {
      const { id } = req.params
      const getCartById = await db.Cart.findByPk(id, {
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })
      return res.status(200).json({
        message: "Get Cart By Id",
        data: getCartById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  checkProduct: async (req, res) => {
    try {
      const { id } = req.params

      const checkProduct = await db.Cart.findByPk(id)

      if (checkProduct.is_checked === true) {
        await db.Cart.update(
          { is_checked: false },
          { where: { id: checkProduct.id } }
        )

        const uncheckProduct = await db.Cart.findByPk(id, {
          include: [
            { model: db.Product, include: [{ model: db.ProductPicture }] },
          ],
        })

        return res.status(200).json({
          message: "Product Uncheck",
          data: uncheckProduct,
        })
      }

      await db.Cart.update(
        { is_checked: true },
        { where: { id: checkProduct.id } }
      )

      const checkProductById = await db.Cart.findByPk(id, {
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      return res.status(200).json({
        message: "Product Checked",
        data: checkProductById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  checkAllProduct: async (req, res) => {
    try {
      const checkAllProduct = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      const productCheck = checkAllProduct.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        await db.Cart.update(
          { is_checked: false },
          { where: { UserId: req.user.id } }
        )

        const uncheckAllProduct = await db.Cart.findAll({
          where: { UserId: req.user.id },
          include: [
            { model: db.Product, include: [{ model: db.ProductPicture }] },
          ],
        })

        return res.status(200).json({
          message: "All Product Uncheck",
          data: uncheckAllProduct,
        })
      }

      await db.Cart.update(
        { is_checked: true },
        { where: { UserId: req.user.id } }
      )

      const findCheckAllProduct = await db.Cart.findAll({
        where: { UserId: req.user.id },
        include: [
          { model: db.Product, include: [{ model: db.ProductPicture }] },
        ],
      })

      return res.status(200).json({
        message: "All Product Checked",
        data: findCheckAllProduct,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  // add same product, if product already added just increment the quantity of product
  addProductQty: async (req, res) => {
    try {
      const { ProductId } = req.params
      const { quantity } = req.body
      const addProductQty = await db.Cart.findOne({
        where: { ProductId },
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })

      const productStock = addProductQty.Product.ProductStocks.map(
        (val) => val.stock
      )
      let subtotal = 0

      for (let i = 0; i < productStock.length; i++) {
        subtotal += Number(productStock[i])
      }

      const totalProductStock = subtotal

      if (addProductQty.quantity + quantity > totalProductStock) {
        return res.status(400).json({
          message: "Stok Barang Habis",
        })
      }

      if (!quantity) {
        await db.Cart.update(
          { quantity: addProductQty.quantity + 1 },
          { where: { id: addProductQty.id } }
        )

        return res.status(200).json({ message: "Product Added" })
      }

      if (quantity) {
        await db.Cart.update(
          { quantity: addProductQty.quantity + quantity },
          { where: { id: addProductQty.id } }
        )

        return res.status(200).json({ message: "Product Added" })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  totalPrice: async (req, res) => {
    try {
      const { id } = req.user

      const getSubTotal = await db.sequelize.query(
        `select sum(p.price * c.quantity) as totalPrice, sum(c.quantity) as totalQty from carts c
          join products p
          on c.ProductId = p.id
          where is_checked = ${true} && UserId = ${id}`
      )
      const totalPrice = getSubTotal[0][0]

      return res.status(200).json({ message: "Total Price", data: totalPrice })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: err.message })
    }
  },
  decreaseQty: async (req, res) => {
    try {
      const { id } = req.params

      const findProduct = await db.Cart.findByPk(id)

      if (findProduct.quantity <= 1) {
        return res.status(200).json({
          message: "Minimal 1 Quantity Produk",
        })
      }

      await db.Cart.update(
        { quantity: findProduct.quantity - 1 },
        { where: { id: findProduct.id } }
      )

      return res.status(200).json({ message: "Quantity Berkurang" })
    } catch (err) {
      console.log(err)
    }
  },
  addQty: async (req, res) => {
    try {
      const { id } = req.params

      const findProduct = await db.Cart.findByPk(id, {
        include: [
          {
            model: db.Product,
            include: [{ model: db.ProductPicture }, { model: db.ProductStock }],
          },
        ],
      })

      const productCart = findProduct.Product.ProductStocks.map(
        (val) => val.stock
      )
      let total = 0

      for (let i = 0; i < productCart.length; i++) {
        total += Number(total[i])
      }

      const subTotal = total

      if (findProduct.quantity + 1 > subTotal) {
        return res.status(400).json({ message: "Stok Produk Habis" })
      }

      await db.Cart.update(
        { quantity: findProduct.quantity + 1 },
        { where: { id: findProduct.id } }
      )

      return res.status(200).json({ message: "Berhasil Menambah Quantity" })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },
  // G1-21 ⬇️
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params

      await db.Cart.destroy({
        where: {
          id: id,
        },
      })
      return res.status(200).json({
        message: "Produk dihapus dari Keranjang !",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteAllProduct: async (req, res) => {
    try {
      await db.Cart.destroy({
        where: { UserId: req.user.id },
      })
      return res.status(200).json({
        mesage: "Semua Produk Dihapus !",
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = cartController
