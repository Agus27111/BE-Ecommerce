const db = require("../config/db.connection.js");
const { Sequelize } = require("sequelize");

const categoryModel = db.define("category", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = categoryModel;
