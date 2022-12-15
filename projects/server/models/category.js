"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Category.init(
    {
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      timestamps: false,
    }
  )
  return Category
}
