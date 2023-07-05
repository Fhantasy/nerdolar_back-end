"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("media_products", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      sinopsys: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      is_episodic: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      launch_date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      end_date: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      total_episodes: {
        allowNull: true,
        type: Sequelize.DataTypes.FLOAT,
      },
      current_episode: {
        allowNull: true,
        type: Sequelize.DataTypes.FLOAT,
      },
      release_date: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      thumb_img: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      banner_img: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("media_products");
  },
};
