const express = require("express");
const app = express();
const helmet = require("helmet");
const logger = require("morgan");

// put on the helmet :)
app.use(helmet());

app.use(require("cors")());
app.use(logger("dev"));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Content-Length,Host,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const ENVIROMENT =
  process.env.NODE_ENV === undefined ? "Development" : process.env.NODE_ENV;

if (ENVIROMENT === "Development") {
  require("dotenv").config({ path: __dirname + "/.env" });
}

app.use(express.urlencoded({ extended: true }));
// authMiddleware
app.get("/", (req, res) => res.json({ msg: "Welcome to Paypal 0auth" }));

// routes


app.use((req, res) => {
  res.status(404).json({ msg: "API not found" });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT} in ${ENVIROMENT}`);
});

