var express = require("express");
var router = express.Router();
const { getLocation } = require("../services/map.service");
const normalizeRooms = require("../ultis/normalize");
const calculatePromethee = require("../ultis/promethee");
const getRooms = require("../services/suggest.service");

router.post("/suggestion", async function (req, res, next) {

  const myObj= {
    price_start: '3000000',
    price_end: '5000000',
    area: '20',
    max_people: '4',
    address: 'Nguyễn Xuân Ôn, Hải Châu, Đà Nẵng',
    feature: {
      toilet: true,
      furniture: false,
      waterHeater: false,
      conditioner: false,
      wifi: true,
      kitchen: true,
      park: false,
      seperate: false
    },
    weight: [
      '0.5',  '0.1',
      '0.1',  '0.1',
      '0.1',  '0.05',
      '0.05'
    ]
  }
  const { price_start, price_end, area, max_people, address, feature, weight } = myObj

  // console.log(req.body)


  
  const priceRange = (price_end - price_start)/2
  const { latitude, longitude, city } = await getLocation(address);
  const queryRoom = await getRooms(price_start, price_end, city, area, max_people);
  const norRoom = await normalizeRooms(
    queryRoom,
    { latitude, longitude },
    feature
  );
  const data = calculatePromethee(norRoom, weight, priceRange);
  //console.log(data)
  res.json(data);
});

module.exports = router;