var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");
var Location = require("./location.model");
var RentInfor = require("./rentInfor.model");

var Room = sequelize.define("Room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
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
  },
  rent_infor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: RentInfor,
      key: "id",
    },
  },
});

module.exports = Room;
