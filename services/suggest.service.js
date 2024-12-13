const sequelize = require("../database/connect.db");
const { QueryTypes } = require("sequelize");

const query = `
  SELECT 
      room.id AS room_id,
      room.area,
      room.max_people,
      location.city,
      location.district,
      location.ward,
      location.street,
      location.detail_address,
      location.latitude,
      location.longitude,
      rent_infor.price,
      rent_infor.electricity_price,
      rent_infor.water_price,
      rent_infor.rental_duration,
      feature_infor.toilet,
      feature_infor.furniture,
      feature_infor.waterHeater,
      feature_infor.wifi,
      feature_infor.kitchen,
      feature_infor.park,
      feature_infor.separate,
      feature_infor.conditioner,
      GROUP_CONCAT(images.image) AS images
  FROM room
  LEFT JOIN location ON room.location_id = location.id
  LEFT JOIN rent_infor ON room.rent_infor_id = rent_infor.id
  LEFT JOIN feature_infor ON room.feature_infor_id = feature_infor.id
  LEFT JOIN images ON room.id = images.room_id
  WHERE 
      rent_infor.price BETWEEN IFNULL(:minPrice, 100000) AND IFNULL(:maxPrice, 10000000) 
      AND location.city LIKE CONCAT('%', IFNULL(:city, ''), '%')
  GROUP BY room.id
  LIMIT 50;
`;
const getRooms = async function (price, city) {
  const minPrice = price - 2000000,
    maxPrice = price + 8000000;
  city = "Hanoi";

  const results = await sequelize.query(query, {
    replacements: { city, minPrice, maxPrice },
    type: QueryTypes.SELECT,
  });
  return results;
};

module.exports = getRooms;
