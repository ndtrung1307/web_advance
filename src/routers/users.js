import express from "express";
import UserController from "../controllers/UserController";
import { userValidator } from "../payloadValidators/usersValidators";

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

export default router;
