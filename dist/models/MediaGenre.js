"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaGenre = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.MediaGenre = database_1.sequelize.define("MediaGenre", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    mediaProductId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "media_products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    genreId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "genres", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});
