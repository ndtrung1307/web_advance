const bcrypt = require("bcrypt");
const userRepos = require("../repos/users");
const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");

class UserController {
  async store(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      return res.json({ message: errors.errors[0].msg });
    }

    const { name, username, password } = req.body;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await userRepos.getByUsername(username);

    if (user) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      return res.json({ message: "Existed Username" });
    }

    const importResult = await userRepos.create({
      name,
      username,
      password: hash,
    });

    console.log("Result: ", importResult);

    res.setHeader("Content-Type", "application/json");
    res.status(201);
    return res.json({ message: "register successfully" });
  }

  async login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      return res.json({ message: errors.errors[0].msg });
    }

    const { username, password } = req.body;

    const user = await userRepos.getByUsername(username);

    if (!user) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      return res.json({ message: "UnExisted User" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.setHeader("Content-Type", "application/json");
      res.status(400);
      return res.json({ message: "username or password incorrect" });
    }

    var token = jwt.sign(
      { username, userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    return res.json({ token });
  }
}

module.exports = new UserController();
