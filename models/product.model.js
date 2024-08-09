const { Sequelize } = require("sequelize");
const db = require("../db/db.connection.js");
const Order = require("./order.model");

const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

// Asosiasi Product dan Order (Many-to-Many)
Product.belongsToMany(Order, {
  through: "OrderProducts", // Tabel perantara
  foreignKey: "productId",
});
Order.belongsToMany(Product, {
  through: "OrderProducts", // Tabel perantara
  foreignKey: "orderId",
});


module.exports = Product;
