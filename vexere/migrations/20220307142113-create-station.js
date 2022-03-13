"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Chịu trách nhiệm tạo bảng trong database
    await queryInterface.createTable("stations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      provinces: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // Chịu trách nhiệm xóa bảng khi nâng cấp version bảng ko còn tồn tại nữa khi chạy lệnh: yarn sequelize-cli db:migrate:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stations");
  },
};
