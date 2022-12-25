"use strict";
const { Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  class Journal extends Model {
    static associate(models) {
      Journal.hasMany(models.JournalItem, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Journal.init(
    {},
    {
      sequelize,
      modelName: "Journal",
      updatedAt: false,
    }
  );
  return Journal;
};
