"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      CartItem.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  CartItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      timestamps: false,
    }
  )
  return CartItem
}
