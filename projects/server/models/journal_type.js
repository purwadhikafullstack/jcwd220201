"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class JournalType extends Model {
    static associate(models) {
      JournalType.hasMany(models.JournalType, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  JournalType.init(
    {
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      stock_added: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JournalType",
      timestamps: true,
    }
  )
  return JournalType
}
