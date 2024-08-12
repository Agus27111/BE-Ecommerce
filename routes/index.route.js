const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const articleCategory = require("./article.route");

//routes
route.get("/", (req, res) => {
  res.send("Hello World!");
});

//API
//User
route.use("/user", userRoute);

//categories
route.use("/category", categoryRoute);

//articles
route.use("/article", articleCategory);

//routes lost
route.use("*", (req, res) => {
  res.send("are you lost brother?");
});

module.exports = route;
