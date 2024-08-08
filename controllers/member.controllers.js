const memberModel = require("../models/member.model");
const bcrypt = require("bcrypt");
const authSession = require("../middleware/authSession");

const memberController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validasi data
      if (!name || !email || !password)
        throw new Error("Nama, email, dan password harus diisi");

      // Cek apakah email sudah ada
      const emailExist = await memberModel.findOne({ where: { email } });
      if (emailExist) throw new Error("Email sudah ada");

      // Hashing password
      const hashPassword = await bcrypt.hash(password, 10);

      // Simpan
      const member = await memberModel.create({
        name,
        email,
        password: hashPassword,
      });

      res.status(201).json({
        status: "success",
        data: member,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validasi data
      if (!email || !password)
        throw new Error("Email dan password harus diisi");

      // Mencari data
      const member = await memberModel.findOne({ where: { email } });
      if (!member) throw new Error("Email salah");

      // Compare password
      const comparePassword = await bcrypt.compare(password, member.password);
      if (!comparePassword) throw new Error("Password salah");

      // Menyimpan data di session
      req.session.member = {
        id: member.id,
        email: member.email,
        name: member.name,
      };

      // Menyimpan timestamp terakhir login
      req.session.lastLogin = Date.now();

      res.status(200).json({
        status: "success",
        data: member,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error(err.message);
        }
        res.status(200).json({
          status: "success",
          message: "Berhasil logout",
        });
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Gagal logout",
      });
    }
  },

  profile: async (req, res) => {
    try {
      const memberSession = await req.session.member;
      res.status(200).json({
        status: "success",
        data: memberSession,
        remainingTime: Date.now() - req.session.lastLogin,
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};

module.exports = memberController;
