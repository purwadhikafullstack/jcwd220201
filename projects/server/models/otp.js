"use strict";
const { Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class Otp extends Model {
    static associate(models) {
      Otp.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Otp.init(
    {
      otp: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },

      issued_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Otp",
      timestamps: false,
    }
  );
  return Otp;
};
