const { body } = require("express-validator");

const validateRegisterUser = () => {
  return [
    body("username", "username must be Alphanumeric").isAlphanumeric(),
    body("username", "username more than 6 characters").isLength({
      min: 6,
    }),
    body("name", "name does not Empty").not().isEmpty(),
    body("password", "password more than 6 characters").isLength({
      min: 6,
    }),
  ];
};

const validateLogin = () => {
  return [
    body("username", "username must be Alphanumeric").isAlphanumeric(),
    body("username", "username more than 6 characters").isLength({
      min: 6,
    }),
    body("password", "password more than 6 characters").isLength({
      min: 6,
    }),
  ];
};

const userValidator = {
  validateRegisterUser,
  validateLogin,
};

module.exports = { userValidator };
