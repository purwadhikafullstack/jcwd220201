"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Warehouse.hasMany(models.ProductStock, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Warehouse.hasMany(models.WarehousesUser, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Warehouse.hasMany(models.StockRequest, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "FromWarehouseId",
      })
      Warehouse.hasMany(models.StockRequest, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "ToWarehouseId",
      })
    }
  }
  Warehouse.init(
    {
      warehouse_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      pinpoint: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Warehouse",
      timestamps: true,
    }
  )
  return Warehouse
}
