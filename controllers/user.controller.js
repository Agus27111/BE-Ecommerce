const userModel = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");
const {
  loginSchema,
  registerSchema,
} = require("../validations/authValidation");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      //validasi dengan @hapi/joi
      const { error } = registerSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      //cek apakah user sudah terdaftar
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) throw new Error("email sudah terdaftar");

      //enkripsi password
      const hashedPassword = await bcrypt.hash(password, 10);

      //simpan ke database
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      successResponse(201, user, "Congratulations, user created!!!", res);
    } catch (error) {
      errorResponse(400, error.message, res);
    }
  },

  login: async (req, res) => {
    try {
      const { name, password } = req.body;

      //validasi dengan @hapi/joi
      const { error } = loginSchema.validate(req.body);

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      //cek user
      const userName = await userModel.findOne({ where: { name } });
      if (!userName) throw new Error("user not found");

      //cek password
      const isMatch = await bcrypt.compare(password, userName.password);
      if (!isMatch) throw new Error("wrong password");
      //simpan di session
      req.session.userId = user.id;
      req.session.name = user.name;

      successResponse(200, user, "Login Success", res);
    } catch (error) {
      errorResponse(400, error.message, res);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      successResponse(200, null, "Logout Success", res);
    } catch (error) {
      errorResponse(400, error.message, res);
    }
  },
};

module.exports = userController;
