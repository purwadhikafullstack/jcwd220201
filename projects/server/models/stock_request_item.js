"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StockRequestItem extends Model {
    static associate(models) {
      StockRequestItem.belongsTo(models.StockRequest, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      StockRequestItem.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  StockRequestItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StockRequestItem",
      timestamps: false,
    }
  );
  return StockRequestItem;
};
