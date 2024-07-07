const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  storage: path.join(__dirname, "database.mysql"),
});

module.exports = sequelize;
