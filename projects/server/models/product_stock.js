"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ProductStock extends Model {
    static associate(models) {
      ProductStock.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }

  ProductStock.init(
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductStock",
      timestamps: true,
    }
  )
  return ProductStock
}
