const express = require("express");
const UserController = require("../controllers/UserController");
const { userValidator } = require("../payloadValidators/usersValidators");

const router = express.Router();

const checkLogin = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

router.post("/login", userValidator.validateLogin(), UserController.login);

router.get("/logout", (req, res) => {
  req.session = null;
  res.clearCookie("user");
  res.redirect("/login");
});

router.post(
  "/register",
  userValidator.validateRegisterUser(),
  UserController.store
);

module.exports = router;
