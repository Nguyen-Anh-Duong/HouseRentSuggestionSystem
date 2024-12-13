var Room = require("./room.model");
var Location = require("./location.model");
var RentInfor = require("./rentInfor.model");
var FeatureInfor = require("./featureInfor.model");
const Images = require("./images.model");
const User = require("./user.model");

// room - location
Location.hasOne(Room, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "location_id",
});
Room.belongsTo(Location, {
  onDelete: "CASCADE",
  foreignKey: "location_id",
  constraints: true,
});

// room - rent infor
Room.belongsTo(RentInfor, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "rent_infor_id",
});
RentInfor.hasOne(Room, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "rent_infor_id",
});

// room - feature infor
Room.belongsTo(FeatureInfor, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "feature_infor_id",
});
FeatureInfor.hasOne(Room, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "feature_infor_id",
});

// room - image
Room.hasMany(Images, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "room_id",
});

Images.belongsTo(Room, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "room_id",
});

// room - user
User.hasMany(Room, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "owner_id",
});
Room.belongsTo(User, {
  onDelete: "CASCADE",
  constraints: true,
  foreignKey: "owner_id",
});

module.exports = {
  Room,
  Location,
  RentInfor,
  FeatureInfor,
  Images,
  User,
};
