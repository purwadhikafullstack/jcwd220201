"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ProductPicture extends Model {
    static associate(models) {
      ProductPicture.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  ProductPicture.init(
    {
      product_picture: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductPicture",
      timestamps: false,
    }
  )
  return ProductPicture
}
