const { Sequelize } = require("sequelize");
const db = require("../db/db.connection.js");
const Order = require("./order.model");

const Member = db.define(
  "member",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Asosiasi Member dan Order (One-to-Many)
Member.hasMany(Order, { foreignKey: "memberId" });

module.exports = Member;
