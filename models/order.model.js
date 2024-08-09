const db = require("../db/db.connection");
const { Sequelize } = require("sequelize");
const Member = require("./member.model");

const Order = db.define(
  "Order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Member,  // Model yang dirujuk
        key: "id",      // Primary key pada model Member
      },
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: true,
  }
);

// Asosiasi Order dan Member (Many-to-One)
Order.belongsTo(Member, { foreignKey: "memberId" });

module.exports = Order;
