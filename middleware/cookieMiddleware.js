const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "you must login first!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "133545fdh");
    req.userId = decoded.id; // Tetapkan ID pengguna dari token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = authMiddleware;
