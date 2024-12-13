var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");

var RentInfor = sequelize.define("rent_infor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
  electricity_price: {
    type: DataTypes.INTEGER,
  },
  water_price: {
    type: DataTypes.INTEGER,
  },
  rental_duration: {
    type: DataTypes.STRING,
  },
});

module.exports = RentInfor;
