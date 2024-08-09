const db = require("../db/db.connection");
const orderModel = require("../models/order.model");
const memberModel = require("../models/member.model");

const orderController = {
  getAll: async (req, res) => {
    try {
      const orders = await orderModel.findAll();

      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  getOneById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderModel.findOne({ where: { id } });
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  getMemberOrders: async (req, res) => {
    try {
      const memberId = req.params.id;
      const memberWithOrders = await memberModel.findByPk(memberId, {
        include: orderModel,
      });

      res.status(200).json(memberWithOrders);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = orderController;
