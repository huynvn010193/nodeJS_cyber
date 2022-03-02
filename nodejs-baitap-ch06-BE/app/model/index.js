const { Sequelize } = require("sequelize");
const { DB, HOST, PASSWORD, USER, dialect } = require("../configs/db.config");

const createProductModel = require("./product.model");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
});

const Product = createProductModel(sequelize);

module.exports = {
  sequelize,
  Product,
};
