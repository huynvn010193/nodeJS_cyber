const { Sequelize } = require("sequelize");
const { DB, HOST, PASSWORD, dialect } = require("../configs/db.config");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect
});

module.exports = {
  sequelize
};