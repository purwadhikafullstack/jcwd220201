const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Address, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Order.belongsTo(models.Courier, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Order.belongsTo(models.Status, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Order.belongsTo(models.User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Order.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
      Order.hasMany(models.OrderItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      })
    }
  }
  Order.init(
    {
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      shipping_service: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      payment_receipt: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    }
  )
  return Order
}
