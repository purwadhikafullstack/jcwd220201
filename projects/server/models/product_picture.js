const { Model } = require("sequelize")
const Sequelize = require("sequelize")
module.exports = function (sequelize, DataTypes) {
  class ProductPicture extends Model {
    static associate(models) {
      ProductPicture.belongsTo(models.Product)
    }
  }
  ProductPicture.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      product_picture: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_pictures",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_product_pictures_product_id_idx",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  )
  return ProductPicture
}
