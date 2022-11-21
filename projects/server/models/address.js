const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
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
    label: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    recipient: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    pinpoint: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addresses',
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
        name: "fk_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
