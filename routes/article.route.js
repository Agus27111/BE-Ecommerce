const express = require("express");
const route = express.Router();
const articleController = require("../controllers/article.controller");
const cookieMiddleware = require("../middleware/cookieMiddleware");

route.get("/list", cookieMiddleware, articleController.getAll);
route.get("/:title", articleController.findByTitle);
route.get("/:publicity", articleController.findByPublicity);
route.post("/", cookieMiddleware, articleController.create);
route.put("/:id", cookieMiddleware, articleController.update);
route.delete("/:id", cookieMiddleware, articleController.delete);

module.exports = route;
