var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var {
  Room,
  Location,
  RentInfor,
  FeatureInfor,
  Images,
  User,
} = require("./models");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { title } = require("process");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//init database
const sequelize = require("./database/connect.db");

const fs = require("fs/promises");
 
const seedData = async (key,model) => {
  try {
    // Đọc file JSON
    const filePath = path.join(__dirname, "datas", key);
    const data = await fs.readFile(filePath, "utf8");
 
    // Chuyển đổi JSON sang JavaScript Object
    const users = await JSON.parse(data);
    console.log(data.length);
 
    // Đồng bộ lại bảng User (nếu cần)
    await sequelize.sync({ force: true });
 
    // Chèn dữ liệu từ JSON vào bảng User
    await model.bulkCreate(users);
 
    console.log("Data has been inserted successfully.");
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
};

const dbTables = {
  "location.json": Location,
  "feature.json": FeatureInfor,
  "rent.json": RentInfor,
  "user.json": User,
  "room.json": Room,
}

async function loopthru(){
  {
  // Your code here
  for (const [key, model] of Object.entries(dbTables)) {
    await seedData(key, model);
  }
}
}

(async () => loopthru())();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.render("error", {title: "Error", message: err.message});
});

module.exports = app;
