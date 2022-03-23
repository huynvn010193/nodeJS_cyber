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
      "users",
      [
        {
          name: "Hao",
          email: "hao09876@gmail.com",
          password: "123456",
          numberPhone: "0987988776",
          avatar:
            "https://thudaumot.edu.vn/wp-content/uploads/2021/03/Nguon-goc-cho-husky-1024x777.jpg",
          type: "ADMIN",
          createdAt: "2022-03-20 08:40:52",
          updatedAt: "2022-03-20 08:40:52",
        },
        {
          name: "Hieu",
          email: "hieu09876@gmail.com",
          password: "123456",
          numberPhone: "0987988776",
          avatar:
            "https://thudaumot.edu.vn/wp-content/uploads/2021/03/Nguon-goc-cho-husky-1024x777.jpg",
          type: "ADMIN",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
