const { Sequelize, DataTypes } = require("sequelize");
const { DB, HOST, PASSWORD, USER, dialect } = require("../configs/db.config");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
});

const Student = sequelize.define("Student", {
  fullName: {
    type: DataTypes.STRING, // VARCHAR 255
  },
  age : {
    type: DataTypes.INTEGER,
  },
  numberClass : {
    type: DataTypes.INTEGER,
  }
},
  {
    timestamps: false
  }
);

module.exports = {
  sequelize
};