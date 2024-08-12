const userController = require("../controllers/user.controller");
const router = require("express").Router();
const cookieMiddleware = require("../middleware/cookieMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/list", userController.list);
router.get("/logout", cookieMiddleware, userController.logout);

module.exports = router;
