const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors");

/* LOAD CONFIG */
require("dotenv").config();
const port = process.env.PORT || 4000;

const routes = require("./routes/api");
const imgRoute = require("./routes/image");
const sequelize = require("./models").sequelize;

/* EXPRESS CONFIGURATION */
const app = express();

/* ALLOW CONNECT BACK-FRONT */
// cors option setup
const corsOptions = {
  origin: 'http://localhost:3000', // allowed request adress
  credentials: true, // add setting contents into response header if set true
};
app.use(cors(corsOptions));

/* === CONNECTION TEST === */
app.get("/", (req, res) => {
  res.send("Hello BLETCHER");
});

/* MySQL CONNECT */
//sequelize.sync();
sequelize
  .sync()
  .then(() => {
    console.log("DB successfully connected.");
  })
  .catch(err => {
    console.log("DB ERROR : ", err);
  });

/* print the request log on console */
app.use(logger("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false }
  })
);

/* ROUTER */
app.use("/api", routes);
app.use("/image", imgRoute);

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/* error handler */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
