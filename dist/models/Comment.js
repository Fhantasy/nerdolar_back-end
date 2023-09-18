"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.Comment = database_1.sequelize.define("Comment", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    message: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    postId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "posts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});
