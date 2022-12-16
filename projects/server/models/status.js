"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Status.init(
    {
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Status",
      timestamps: false,
    }
  )
  return Status
}
