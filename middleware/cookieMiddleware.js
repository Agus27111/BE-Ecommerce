const cookie = require("cookie");

const cookieMiddleware = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  req.cookies = cookies;
  next();
};

module.exports = cookieMiddleware;
