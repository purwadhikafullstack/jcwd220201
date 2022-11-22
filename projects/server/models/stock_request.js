const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StockRequest', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    from_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    to_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    created_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    approved_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stock_requests',
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
        name: "fk_stock_requests_from_warehouse_id_idx",
        using: "BTREE",
        fields: [
          { name: "from_warehouse_id" },
        ]
      },
      {
        name: "fk_stock_requests_to_warehouse_id_idx",
        using: "BTREE",
        fields: [
          { name: "to_warehouse_id" },
        ]
      },
      {
        name: "fk_stock_requests_created_by_users_id_idx",
        using: "BTREE",
        fields: [
          { name: "created_by_user_id" },
        ]
      },
    ]
  });
};
