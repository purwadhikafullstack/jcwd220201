"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Journal extends Model {
    static associate(models) {
      Journal.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Journal.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Journal",
      timestamps: true,
    }
  )
  return Journal
}
