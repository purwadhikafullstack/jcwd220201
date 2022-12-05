"use strict"
const Sequelize = require("sequelize")
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.hasMany(models.ProductPicture)
      Product.hasMany(models.ProductStock)
    }
  }
  Product.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_products_category_id_idx",
          using: "BTREE",
          fields: [{ name: "category_id" }],
        },
      ],
    }
  )
  return Product
}
