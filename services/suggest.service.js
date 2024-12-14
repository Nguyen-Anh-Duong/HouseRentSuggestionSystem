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
      AND room.area >= IFNULL(:minArea, 10) - 10
      AND room.max_people >= IFNULL(:minMaxPeole, 100000) - 2
  GROUP BY room.id
  ORDER BY room.area DESC
  LIMIT 5;
`;
const getRooms = async function (price_start, price_end, city, minArea, minMaxPeole) {
  const minPrice = price_start;
    maxPrice = price_end;
  const results = await sequelize.query(query, {
    replacements: { city, minPrice, maxPrice, minArea, minMaxPeole },
    type: QueryTypes.SELECT,
  });
  return results;
};

module.exports = getRooms;
