"use strict"
const { Model } = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      timestamps: false,
    }
  )
  return Role
}
