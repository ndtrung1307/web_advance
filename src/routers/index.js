const productRoute = require("./products");
const users = require("./users");

const authenticationController = require("../controllers/authenticationController");

function routes(app) {
  app.use("/", users);

  app.use("/", authenticationController.authenticateUser, productRoute);

  app.use("*", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(404);
    return res.json({ message: "not found" });
  });

  app.use((err, req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(500);
    return res.json({ message: "Internal Server Error" });
  });
}
module.exports = routes;
