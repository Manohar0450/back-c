var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var fetchDataRouter = require("./routes/fetchDataRouter");
const mongoose = require("mongoose");

var app = express();

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://vajjalaabhiram:bkAJJ3HU3vpesogK@adminlogins.ofv1q.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Allow CORS for Frontend
app.use(
  cors({
    origin: "https://acetmeda.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api", fetchDataRouter);

// Error Handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
