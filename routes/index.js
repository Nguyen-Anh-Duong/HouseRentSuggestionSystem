var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("dss");
});

router.use("/", require("./suggestion"));

module.exports = router;
