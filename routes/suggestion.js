var express = require("express");
var router = express.Router();
const { getLocation } = require("../services/map.service");
const normalizeRooms = require("../ultis/normalize");
const calculatePromethee = require("../ultis/promethee");
const getRooms = require("../services/suggest.service");

router.post("/suggestion", async function (req, res, next) {
  const { price_start, price_end, area, max_people, address, features, weight } = req.body
  // {
  //   "price_start": 0,
  //   "price_end": 3000000,
  //   "area": 20,
  //   "max_people": 4,
  //   "address": "Hà Nội",
  //   "feature": {
  //     "toilet": true,
  //     "furniture": false,
  //     "waterHeater": false,
  //     "conditioner": false,
  //     "wifi": false,
  //     "kitchen": false,
  //     "park": false,
  //     "seperate": false
  //   },
  //   "weight": [ 0.2, 0.4, 0.3, 0.1, 0.1]
  // }
  const priceRange = (price_end - price_start)/2
  const { latitude, longitude, city } = await getLocation(address);
  const queryRoom = await getRooms(price_start, price_end, city, area, max_people);
  const norRoom = await normalizeRooms(
    queryRoom,
    { latitude, longitude },
    features
  );
  // console.log(norRoom)
  const data = calculatePromethee(norRoom, weigsht, priceRange);
  console.log(data)
  res.json(data);
});

module.exports = router;
