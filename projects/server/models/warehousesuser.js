"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class WarehousesUser extends Model {
    static associate(models) {
      WarehousesUser.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      WarehousesUser.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  WarehousesUser.init(
    {},
    {
      sequelize,
      modelName: "WarehousesUser",
      timestamps: true,
    }
  )
  return WarehousesUser
}
