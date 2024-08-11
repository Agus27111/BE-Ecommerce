const { Sequelize } = require("sequelize");

const db = new Sequelize("projectSequelize", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    // acquire: 30000,
    // idle: 10000,
  },
});

//authentication
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

//sinkronisasi
db.sync({ alter: true });

module.exports = db;
