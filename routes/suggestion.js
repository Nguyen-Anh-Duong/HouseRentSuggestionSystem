var express = require("express");
var router = express.Router();

router.get("/suggestion", function (req, res, next) {
  // goi ham query
  res.render("index", { title: "Hello" });
});

module.exports = router;
