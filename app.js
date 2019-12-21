const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const port = process.env.PORT || 4000;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const signupRouter = require("./routes/signup");
const sequelize = require("./models").sequelize;

const app = express();
//sequelize.sync();
sequelize
  .sync()
  .then(() => {
    console.log("DB successfully connected.");
  })
  .catch(err => {
    console.log("xxx-- DB connect fail --xxx");
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
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
app.use(flash());

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
