var express = require("express");
var router = express.Router();

router.get("/suggestion", function (req, res, next) {
  //const { price, area, max_people, address, feature } = req.body;

  // goi ham query

  const mockRooms = require("../sampleDatas/sampleRoomData");

  //console.log(mockRooms[0]);

  res.json("hhe");
});

module.exports = router;
