const { Model } = require("sequelize")
const Sequelize = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class ProductStock extends Model {
    static associate(models) {
      ProductStock.belongsTo(models.Product)
    }
  }

  ProductStock.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_stocks",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_product_stocks_warehouse_id_idx",
          using: "BTREE",
          fields: [{ name: "warehouse_id" }],
        },
        {
          name: "fk_product_stocks_product_id_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  )
  return ProductStock
}
