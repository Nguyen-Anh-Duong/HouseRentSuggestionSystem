var Sequelize = require("sequelize");
require("dotenv").config();

var sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  database: process.env.DB_NAME || "HouseRent",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "123456",
  port: process.env.DB_PORT || 3306,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
