const { Sequelize } = require("sequelize");
const db = require("../config/db.connection");
const user = require("./user.model");
const category = require("./category.model.js");

const articleModule = db.define("article", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publicity: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: user,
      key: "id",
    },
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: category,
      key: "id",
    },
  },
});

//asosiasi
user.hasMany(articleModule, { foreignKey: "userId" });
category.hasMany(articleModule, { foreignKey: "categoryId" });

//inverse
articleModule.belongsTo(user, { foreignKey: "userId" });
articleModule.belongsTo(category, { foreignKey: "categoryId" });

module.exports = articleModule;
