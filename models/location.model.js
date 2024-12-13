var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");

const Location = sequelize.define("location", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  ward: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  detail_address: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.DECIMAL(20, 15),
  },
  longitude: {
    type: DataTypes.DECIMAL(20, 15),
  },
});

module.exports = Location;
