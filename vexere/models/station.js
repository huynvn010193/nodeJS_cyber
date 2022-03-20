"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trips }) {
      // define association here
      this.hasMany(Trips, { foreignKey: "fromStation" });
      this.hasMany(Trips, { foreignKey: "toStation" });
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 30],
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          // custom lại validator.
          checkLength(value) {
            if (value.length > 5 && value.length <= 20) {
              return true;
            } else {
              throw new Error("Độ dài phải từ 5 đến 20 ký tự");
            }
          },
        },
      },
      provinces: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // bắt buộc phải điền đúng tên
          isIn: [["HCM", "DN", "CT", "HP", "HN"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  return Station;
};
