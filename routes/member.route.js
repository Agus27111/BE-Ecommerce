// routes\member.route.js
const route = require("express").Router();
const memberController = require("../controllers/member.controllers");
const authSession = require("../middleware/authSession");

route.post("/register", memberController.register);
route.post("/login", memberController.login);
route.post("/logout", authSession, memberController.logout);
route.get("/profile", authSession, memberController.profile);

module.exports = route;
