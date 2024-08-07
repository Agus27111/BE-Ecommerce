const userController = require("../controllers/user.controller");
const route = require("express").Router();

route.post("/login", userController.login);
route.post("/register", userController.register);
route.get("/logout", userController.logout);

module.exports = route;
