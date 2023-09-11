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
        validate: {
          isIn: [["ongoing", "complete"]],
        },
      },
      is_episodic: {
        allowNull: true,
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
      release_dates: {
        allowNull: true,
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.DATE),
      },
      thumbnail_img: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      page_banner_img: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      category_id: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
    await queryInterface.dropTable("media_products");
  },
};
