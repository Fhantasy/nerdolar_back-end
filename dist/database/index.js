"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const enviroment_1 = require("../config/enviroment");
exports.sequelize = new sequelize_1.Sequelize(enviroment_1.DATABASE_URL, {
    define: {
        underscored: true,
    },
});
