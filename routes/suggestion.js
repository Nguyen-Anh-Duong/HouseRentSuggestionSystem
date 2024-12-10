var express = require("express");
var router = express.Router();

router.get("/suggestion", function (req, res, next) {
  const { price, area, max_people, address, feature } = req.body;

  // goi ham query

  //   const mockData =

  res.render("index", { title: "Hello" });
});

module.exports = router;
