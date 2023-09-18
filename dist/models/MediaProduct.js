"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaProduct = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.MediaProduct = database_1.sequelize.define("MediaProduct", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    sinopsys: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [["ongoing", "complete"]],
        },
    },
    isEpisodic: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    launchDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    totalEpisodes: {
        allowNull: true,
        type: sequelize_1.DataTypes.FLOAT,
    },
    currentEpisode: {
        allowNull: true,
        type: sequelize_1.DataTypes.FLOAT,
    },
    releaseDates: {
        allowNull: true,
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.DATE),
    },
    thumbnailImg: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    pageBannerImg: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    categoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});
