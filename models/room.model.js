var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");
var Location = require("./location.model");
var RentInfor = require("./rentInfor.model");
var FeatureInfor = require("./featureInfor.model");
const User = require("./user.model");

var Room = sequelize.define("room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area: {
    type: DataTypes.INTEGER,
    //allowNull: false,
  },
  max_people: {
    type: DataTypes.INTEGER,
  },
  location_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Location,
      key: "id",
    },
    unique: true,
  },
  rent_infor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: RentInfor,
      key: "id",
    },
    unique: true,
  },
  feature_infor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FeatureInfor,
      key: "id",
    },
    unique: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});
console.log(Room.associations);

module.exports = Room;
