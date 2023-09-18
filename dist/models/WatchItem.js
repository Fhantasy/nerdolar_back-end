"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.WatchItem = database_1.sequelize.define("WatchItem", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    status: {
        allowNull: false,
        defaultValue: "ongoing",
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [["ongoing", "complete"]],
        },
    },
    currentEpisode: {
        allowNull: false,
        defaultValue: 1,
        type: sequelize_1.DataTypes.FLOAT,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    mediaProductId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "media_products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    categoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});
