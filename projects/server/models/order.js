const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'addresses',
        key: 'id'
      }
    },
    courier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'couriers',
        key: 'id'
      }
    },
    shipping_service: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    payment_receipt: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'statuses',
        key: 'id'
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_orders_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_orders_address_id_idx",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "fk_orders_courier_id_idx",
        using: "BTREE",
        fields: [
          { name: "courier_id" },
        ]
      },
      {
        name: "fk_orders_status_id_idx",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
};
