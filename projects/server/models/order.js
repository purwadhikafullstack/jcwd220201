const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Address, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.Courier, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.Status, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.Warehouse, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Order.hasMany(models.OrderItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Order.init(
    {
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      shipping_service: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      shipping_cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payment_receipt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: false,
    }
  );
  return Order;
};
