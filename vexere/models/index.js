"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Mỗi lần tạo model -> tự động export model ra lun
// Đọc toàn bộ file trong thư mục model, sau khi đọc xong tập hợp các file thành cái mảng tên các file
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      // điều kiện tên file phải có dấu ".", basename phải khác thư mục này , cắt 3 ký tự cuối của file phải là ".js" -> thì mới cho trả về
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // nối 2 đường dẩn: 1
    // __direname: đường dẫn ngay tới index
    // file: tên file vd: .station -> đi đến station
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
