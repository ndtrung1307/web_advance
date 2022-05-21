const express = require("express");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routers");
const { COOKIE_SECRET } = process.env;

const app = express();

// DDOS protection
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res) => {
      res.status(429).send("Too many requests");
    },
  })
);

app.use(cookieParser());
app.use(
  cookieSession({ secret: COOKIE_SECRET, maxAge: 30 * 24 * 60 * 60 * 1000 })
);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "files")));

//set template engine ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.url = function (url) {
  return url.substring(1);
};

routes(app);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
