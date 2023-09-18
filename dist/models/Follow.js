"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.Follow = database_1.sequelize.define("Follow", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    userFollowingId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    userFollowedId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
});
