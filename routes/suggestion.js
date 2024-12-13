var express = require("express");
var router = express.Router();
const { getLocation } = require("../services/map.service");
const normalizeRooms = require("../ultis/normalize");
const calculatePromethee = require("../ultis/promethee");
const getRooms = require("../services/suggest.service");

router.get("/suggestion", async function (req, res, next) {
  const { price, area, max_people, address, features, weight } = req.body;

  const { latitude, longitude, city } = await getLocation(address);
  const queryRoom = await getRooms(price, city);

  const norRoom = await normalizeRooms(
    queryRoom,
    { latitude, longitude },
    features
  );

  const data = calculatePromethee(norRoom, weight);

  res.json(data);
});

module.exports = router;
