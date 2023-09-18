"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.Genre = database_1.sequelize.define("Genre", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
});
