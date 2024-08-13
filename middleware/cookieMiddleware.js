const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    // Verifikasi token dan tambahkan userId ke req jika berhasil
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "133545fdh");
    req.userId = decoded.id;
  }
  next();
};

module.exports = authMiddleware;
