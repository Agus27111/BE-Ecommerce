const authSession = (req, res, next) => {
  if (!req.session.member) {
    return res.status(401).json({
      message: "Login Terlebih Dahulu",
    });
  }
  const currentTime = Date.now();
  const sessionAge = currentTime - req.session.lastLogin;
  const sessionValidity = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

  if (sessionAge > sessionValidity) {
    // Jika session sudah kedaluwarsa
    return res.status(401).json({
      message: "Session telah kedaluwarsa, silakan login kembali",
    });
  }

  next();
};

module.exports = authSession;
