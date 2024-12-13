var { DataTypes } = require("sequelize");
var sequelize = require("../database/connect.db");
const Room = require("./room.model");

var Images = sequelize.define("images", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  room_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Room,
      key: "id",
    },
  },
  image: {
    type: DataTypes.BLOB,
  },
});

module.exports = Images;
