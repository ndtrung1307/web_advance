var jwt = require("jsonwebtoken");

const permissionNeededRoutes = ["POST /products"];

class authenticationController {
  async authenticateUser(req, res, next) {
    const token =
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1];
    console.log("[Debug] Token: ", token);

    const routeKey = `${req.method} ${req._parsedUrl.pathname}`;

    const isAuthNeededRoute = permissionNeededRoutes.includes(routeKey);
    console.log("isAuthNeededRoute: ", isAuthNeededRoute);

    if (!isAuthNeededRoute) {
      return next();
    }

    if (!token) {
      res.setHeader("Content-Type", "application/json");
      res.status(401);
      return res.json({ message: "Unauthorized" });
    }

    try {
      const messagePayload = jwt.verify(token, process.env.JWT_SECRET);
      req.userClaims = messagePayload;
      console.log("messagePayload: ", messagePayload);
      return next();
    } catch (error) {
      console.error("[Authentication] Error: ", error);
      res.setHeader("Content-Type", "application/json");
      res.status(401);
      return res.json({ message: "Unauthorized" });
    }
  }
}

module.exports = new authenticationController();
