var Room = require("./room.model");
var Location = require("./location.model");
var RentInfor = require("./rentInfor.model");
var FeatureInfor = require("./featureInfor.model");

// // room - location
// Room.hasOne(Location, {
//   foreignKey: "roomId",
// });
// Location.belongsTo(Room, {
//   foreignKey: "roomId",
// });

// // room - rent infor
// Room.hasOne(RentInfor, {
//   foreignKey: "roomId", // Khóa ngoại đã đặt trong model RentInfor
// });
// RentInfor.belongsTo(Room, {
//   foreignKey: "roomId",
// });

// // room - feature infor
// Room.hasOne(FeatureInfor, {
//   foreignKey: "roomId", // Khóa ngoại đã đặt trong model FeatureInfor
// });
// FeatureInfor.belongsTo(Room, {
//   foreignKey: "roomId",
// });

module.exports = {
  Room,
  Location,
  RentInfor,
  FeatureInfor,
};
