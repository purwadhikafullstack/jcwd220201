"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      OrderItem.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  OrderItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      timestamps: false,
    }
  )
  return OrderItem
}
