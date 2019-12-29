const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT || 4000;

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const signupRouter = require("./routes/signup");

// Sequelize
const sequelize = require("./models").sequelize;

const app = express();
//sequelize.sync();
sequelize
  .sync()
  .then(() => {
    console.log("DB successfully connected.");
  })
  .catch(err => {
    console.log("DB ERROR : ", err);
  });

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

// Router
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signup", signupRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
