var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var usersRouter = require("./routes/users");

var app = express();

// 解决跨域问题
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/user", usersRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 图片路径
app.use(
  "/uploads/images/news",
  express.static(path.join(__dirname, "public", "images", "news"))
);
app.use(
  "/uploads/images/avatars",
  express.static(path.join(__dirname, "public", "images", "avatars"))
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
