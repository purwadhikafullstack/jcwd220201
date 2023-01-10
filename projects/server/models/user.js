"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cart, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Otp, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Order, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      User.hasMany(models.Address, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      User.hasMany(models.StockRequest, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        foreignKey: "CreatedByUserId",
      })
      User.hasMany(models.WarehousesUser, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      User.belongsTo(models.Role, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_verified: {
        type: DataTypes.TINYINT,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  )
  return User
}
