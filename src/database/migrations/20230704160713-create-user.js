"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      locale: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: {
          isIn: [["admin", "user"]],
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      bio: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      birth: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      profile_image: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      profile_banner_image: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
