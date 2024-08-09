const route = require("express").Router();
const orderController = require("../controllers/order.controller.js");
const authSession = require("../middleware/authSession");

route.get("/order", orderController.getAll);
route.get("/order/:id", orderController.getOneById);
route.get("/order/member/:id", orderController.getMemberOrders);

module.exports = route;
