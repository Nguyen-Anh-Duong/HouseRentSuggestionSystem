var express = require("express");
var router = express.Router();
const mockRooms = require("../sampleDatas/sampleRoomData");
const { getLocation } = require("../services/map.service");
const normalize = require("../ultis/normalize");
const promethee = require("../ultis/promethee");

router.get("/suggestion", async function (req, res, next) {
  const { price, area, max_people, address, feature } = req.body;
  // feature la dich vu ma nguoi dung yeu cau

  /*   // goi ham query
  const suggestion = ... */
  const { latitude, longitude } = await getLocation(address);
  const suggestRoom = await normalize(
    mockRooms,
    { latitude, longitude },
    feature
  );

  const data = promethee(suggestRoom);

  res.json(data);
});

module.exports = router;
