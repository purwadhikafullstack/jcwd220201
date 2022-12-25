"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Cart.belongsTo(models.Product, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Cart.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      timestamps: true,
    }
  );
  return Cart;
};
