"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("watch_items", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        defaultValue: "ongoing",
        type: Sequelize.DataTypes.STRING,
        validate: {
          isIn: [["ongoing", "complete"]],
        },
      },
      current_episode: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.DataTypes.FLOAT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      media_product_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "media_products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
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
    await queryInterface.dropTable("watch_items");
  },
};
