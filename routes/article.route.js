const express = require("express");
const route = express.Router();
const articleController = require("../controllers/article.controller");
const cookieMiddleware = require("../middleware/cookieMiddleware");

route.get("/list", cookieMiddleware, articleController.getAll);
route.get("/title/:title", articleController.findByTitle);
route.get("/publicity/:year", articleController.findByPublicity);
route.post("/create", cookieMiddleware, articleController.create);
route.put("/update/:id", cookieMiddleware, articleController.update);
route.delete("/delete/:id", cookieMiddleware, articleController.delete);

module.exports = route;
