"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Address.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Address.init(
    {
      label: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      recipient: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: true,
      },
      pinpoint: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Address",
      timestamps: false,
    }
  )
  return Address
}
