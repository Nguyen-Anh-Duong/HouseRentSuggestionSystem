var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");

var FeatureInfor = sequelize.define("FeatureInfor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  has_air_conditioner: {
    type: DataTypes.BOOLEAN,
  },
  has_car_park: {
    type: DataTypes.BOOLEAN,
  },
  has_private_bathroom: {
    type: DataTypes.BOOLEAN,
  },
  has_balcony: {
    type: DataTypes.BOOLEAN,
  },
  has_laundry: {
    type: DataTypes.BOOLEAN,
  },
  has_kitchen: {
    type: DataTypes.BOOLEAN,
  },
  has_wifi: {
    type: DataTypes.BOOLEAN,
  },
  has_pet_allowed: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = FeatureInfor;
