"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JournalItem extends Model {
    static associate(models) {
      JournalItem.belongsTo(models.JournalType, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      JournalItem.belongsTo(models.Journal, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      JournalItem.belongsTo(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      JournalItem.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      JournalItem.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  JournalItem.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock_before: {
        type: DataTypes.INTEGER,
      },
      stock_after: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "JournalItem",
      updatedAt: false,
    }
  );
  return JournalItem;
};
