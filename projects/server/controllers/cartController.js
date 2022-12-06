const db = require("../models")

const cartController = {
  addToCart: async (req, res) => {
    // Check if Product alr added in Cart ?
    const { product_id } = req.body

    const findProductsCart = await CartItem.findOne({
      where: {
        product_id: product_id,
      },
      include: [{ model: db.Cart }],
    })
    if (findProductsCart) {
      return res.status(400).json({
        message: "Already Added in Cart !",
      })
    }

    const addProductCart = await CartItem.create({
      cart_id: cart_id,
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
    })

    const findAddProductCart = await Cart.findByPk(addProductCart.id, {
      include: db.Cart,
    })

    return res.status(200).json({
      message: "Add Product to Cart !",
      data: findAddProductCart,
    })
  },
  showCartItems: async (req, res) => {
    try {
      const showAllProductItems = await CartItem.findAll({
        include: [{ model: db.Cart }],
      })

      return res.status(200).json({
        message: "Products in Cart!",
        data: showAllProductItems,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params

      await CartItem.destroy({
        where: {
          id: id,
        },
      })
      return res.status(200).json({
        message: "Product deleted from Cart !",
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
