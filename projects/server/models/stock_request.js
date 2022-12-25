"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StockRequest extends Model {
    static associate(models) {
      StockRequest.hasMany(models.StockRequestItem);
      StockRequest.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "CreatedByUserId",
      });
      StockRequest.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "FromWarehouseId",
      });
      StockRequest.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "ToWarehouseId",
      });
    }
  }
  StockRequest.init(
    {
      date: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      approved_date: {
        type: "TIMESTAMP",
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "StockRequest",
      timestamps: false,
    }
  );
  return StockRequest;
};
