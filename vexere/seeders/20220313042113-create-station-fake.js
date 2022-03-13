'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('stations', 
    [
      {
        name: 'Bến xe miền tây',
        address: "395 Kinh Dương Vương, An Lạc, Bình Tân, Thành phố Hồ Chí Minh",
        provinces: "HCM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bến xe đà nẵng',
        address: "Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng 550000",
        provinces: "DN",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('stations', null, {});
  }
};
