const { Sequelize } = require("sequelize");

const db = new Sequelize("ecommerse", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

//auth
db.authenticate()
  .then(() => {
    console.log("database terhubung dengan baik");
  })
  .catch(() => {
    console.log("tidak dapat terhubung ke database");
  });

///check database
db.sync({ alter: true, force: false });

module.exports = db;
