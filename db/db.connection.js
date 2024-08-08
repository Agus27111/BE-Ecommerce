const { Sequelize } = require("sequelize");

const db = new Sequelize("ecommerse", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sync({ alter: true, force: false });

module.exports = db;
