"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.CartItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Cart.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Cart.init(
    {},
    {
      sequelize,
      modelName: "Cart",
      timestamps: false,
    }
  )
  return Cart
}
