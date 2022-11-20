const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('JournalItem', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    journal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journals',
        key: 'id'
      }
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouses',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    journal_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'journal_types',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'journal_items',
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
        name: "fk_journal_items_journal_id_idx",
        using: "BTREE",
        fields: [
          { name: "journal_id" },
        ]
      },
      {
        name: "fk_journal_items_warehouse_id_idx",
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "fk_journal_items_product_id_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "fk_journal_items_journal_type_idx",
        using: "BTREE",
        fields: [
          { name: "journal_type_id" },
        ]
      },
      {
        name: "fk_journal_items_order_id_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
