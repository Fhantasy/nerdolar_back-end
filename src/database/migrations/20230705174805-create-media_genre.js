"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("media_genres", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      media_product_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "media_products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      genre_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "genres", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("media_genres");
  },
};
