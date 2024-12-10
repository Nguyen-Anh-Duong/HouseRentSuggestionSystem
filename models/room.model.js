var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");
var Location = require("./location.model");

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
    type: DataTypes.STRING,
    allowNull: false,
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
});

module.exports = Room;
