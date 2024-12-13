var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");

var FeatureInfor = sequelize.define("feature_infor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  toilet: {
    type: DataTypes.BOOLEAN,
  },
  conditioner: {
    type: DataTypes.BOOLEAN,
  },
  furniture: {
    type: DataTypes.BOOLEAN,
  },
  waterHeater: {
    type: DataTypes.BOOLEAN,
  },
  wifi: {
    type: DataTypes.BOOLEAN,
  },
  kitchen: {
    type: DataTypes.BOOLEAN,
  },
  park: {
    type: DataTypes.BOOLEAN,
  },
  separate: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = FeatureInfor;
