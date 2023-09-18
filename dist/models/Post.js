"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.Post = database_1.sequelize.define("Post", {
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
    imageUrls: {
        allowNull: true,
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
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
});
