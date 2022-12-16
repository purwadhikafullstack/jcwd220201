"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class StockRequest extends Model {
    static associate(models) {
      StockRequest.hasMany(models.StockRequestItem)
      StockRequest.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "CreatedByUserId",
      })
      StockRequest.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "FromWarehouseId",
      })
      StockRequest.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "ToWarehouseId",
      })
    }
  }
  StockRequest.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      approved_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "StockRequest",
      timestamps: true,
    }
  )
  return StockRequest
}
