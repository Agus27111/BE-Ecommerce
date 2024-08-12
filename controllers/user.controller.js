const userModel = require("../models/user.model");
const { encript, compare } = require("../libraries/bcrypt.library");
const {
  successResponse,
  errorResponse,
} = require("../libraries/response.library");
const validation = require("../libraries/validation.library");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validasi
      const { error } = validation.registerSchema.validate(req.body);
      if (error) {
        return errorResponse(400, error.details[0].message, res);
      }

      // Cek email
      const emailExist = await userModel.findOne({ where: { email } });
      if (emailExist) {
        return errorResponse(400, "Email already registered", res);
      }

      // Enkripsi password
      const hashPassword = await encript(password);

      // Simpan ke database
      const user = await userModel.create({
        username,
        email,
        password: hashPassword,
      });

      // Respon sukses
      return successResponse(200, user, "User registered successfully", res);
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to register user",
        res
      );
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validasi
      const { error } = validation.loginSchema.validate(req.body);
      if (error) return errorResponse(400, error.details[0].message, res);

      // Cek user
      const user = await userModel.findOne({ where: { username } });
      if (!user) return errorResponse(404, "User not found", res);

      // Cek password
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) return errorResponse(401, "Wrong password", res);

      // Generate token

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "133545fdh",
        {
          expiresIn: "1d",
        }
      );

      // Kirim token ke cookie
      res.cookie("token", token, { sameSite: "strict", httpOnly: true });

      // Kirim response sukses
      return successResponse(200, user, "Anda berhasil login", res);
    } catch (error) {
      // Kirim response error
      return errorResponse(500, error.message || "Failed to login", res);
    }
  },
  logout: async (req, res) => {
    try {
      // Akses token dari cookies
      const token = req.cookies.token;

      if (!token) {
        return errorResponse(400, "No token found", res);
      }

      // Hapus cookie token
      res.clearCookie("token");

      // Kirimkan response sukses
      return successResponse(200, null, "Anda berhasil logout", res);
    } catch (error) {
      // Kirimkan response error
      return errorResponse(500, error.message || "Failed to logout", res);
    }
  },
  list: async (req, res) => {
    try {
      const allUser = await userModel.findAll();
      return successResponse(200, allUser, "this is all user", res);
    } catch (error) {
      return errorResponse(
        500,
        error.message || "Failed to show all user",
        res
      );
    }
  },
};

module.exports = userController;
