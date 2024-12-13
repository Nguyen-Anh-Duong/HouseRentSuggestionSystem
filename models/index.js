// room - location
// Location.hasOne(Room, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "location_id",
// });
// Room.belongsTo(Location, {
//   onDelete: "CASCADE",
//   foreignKey: "location_id",
//   constraints: true,
// });

// // room - rent infor
// RentInfor.hasOne(Room, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "rent_infor_id",
// });
// Room.belongsTo(RentInfor, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "rent_infor_id",
// });

// // room - feature infor
// FeatureInfor.hasOne(Room, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "feature_infor_id",
// });
// Room.belongsTo(FeatureInfor, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "feature_infor_id",
// });

// // room - image
// Room.hasMany(Images, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "room_id",
// });

// Images.belongsTo(Room, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "room_id",
// });

// // room - user
// User.hasMany(Room, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "owner_id",
// });
// Room.belongsTo(User, {
//   onDelete: "CASCADE",
//   constraints: true,
//   foreignKey: "owner_id",
// });

const Room = require("./room.model");
const Location = require("./location.model");
const RentInfor = require("./rentInfor.model");
const FeatureInfor = require("./featureInfor.model");
const Images = require("./images.model");
const User = require("./user.model");

// room - location
Location.hasOne(Room, { onDelete: "CASCADE", foreignKey: "location_id" });
Room.belongsTo(Location, { onDelete: "CASCADE", foreignKey: "location_id" });

// room - rent_infor
RentInfor.hasOne(Room, { onDelete: "CASCADE", foreignKey: "rent_infor_id" });
Room.belongsTo(RentInfor, { onDelete: "CASCADE", foreignKey: "rent_infor_id" });

// room - feature_infor
FeatureInfor.hasOne(Room, {
  onDelete: "CASCADE",
  foreignKey: "feature_infor_id",
});
Room.belongsTo(FeatureInfor, {
  onDelete: "CASCADE",
  foreignKey: "feature_infor_id",
});

// room - images
Room.hasMany(Images, { onDelete: "CASCADE", foreignKey: "room_id" });
Images.belongsTo(Room, { onDelete: "CASCADE", foreignKey: "room_id" });

// room - user
User.hasMany(Room, { onDelete: "CASCADE", foreignKey: "owner_id" });
Room.belongsTo(User, { onDelete: "CASCADE", foreignKey: "owner_id" });

module.exports = {
  Room,
  Location,
  RentInfor,
  FeatureInfor,
  Images,
  User,
};
