"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class JournalType extends Model {
    static associate(models) {
      JournalType.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  JournalType.init(
    {
      name: {
        type: DataTypes.STRING(50),
      },
      type: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "JournalType",
      timestamps: false,
    }
  )
  return JournalType
}
