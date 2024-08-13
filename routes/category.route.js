const express = require("express");
const route = express.Router();
const categoryController = require("../controllers/category.controller");
const cookieMiddleware = require("../middleware/cookieMiddleware");

route.get("/", categoryController.getAll);
route.post("/create", cookieMiddleware, categoryController.create);
route.delete("/:id", cookieMiddleware, categoryController.delete);
//find article by categoryId
route.get("/:categoryId", cookieMiddleware, categoryController.getOneById);

module.exports = route;
