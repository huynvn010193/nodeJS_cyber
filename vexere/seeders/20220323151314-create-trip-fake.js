"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "trips",
      [
        {
          fromStation: 1,
          toStation: 2,
          startTime: "2021-06-13 08:30:00",
          price: 200000,
          createdAt: "2022-03-20 08:40:52",
          updatedAt: "2022-03-20 08:40:52",
        },
        {
          fromStation: 3,
          toStation: 4,
          startTime: "2021-06-13 08:30:00",
          price: 250000,
          createdAt: "2022-03-20 08:40:52",
          updatedAt: "2022-03-20 08:40:52",
        },
        {
          fromStation: 1,
          toStation: 4,
          startTime: "2021-06-13 08:30:00",
          price: 300000,
          createdAt: "2022-03-20 08:40:52",
          updatedAt: "2022-03-20 08:40:52",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("trips", null, {});
  },
};
