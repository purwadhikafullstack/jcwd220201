"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Courier extends Model {
    static associate(models) {
      Courier.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Courier.init(
    {
      courier_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Courier",
      timestamps: false,
    }
  )
  return Courier
}
