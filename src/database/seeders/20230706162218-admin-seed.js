const bcrypt = require("bcrypt");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("users", [
      {
        nickname: "Admin",
        email: "admin@email.com",
        password: hashedPassword,
        locale: null,
        role: "admin",
        name: "Admin",
        bio: null,
        birth: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      where: { email: "admin@email.com" },
    });
  },
};
