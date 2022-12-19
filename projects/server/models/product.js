"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.Cart, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.ProductPicture, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.StockRequestItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.OrderItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Product.hasMany(models.ProductStock, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  )
  return Product
}
