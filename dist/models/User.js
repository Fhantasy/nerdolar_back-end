"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.User = database_1.sequelize.define("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    nickname: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    locale: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [["admin", "user"]],
        },
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    bio: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    birth: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    profileImg: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    profileBannerImg: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    hooks: {
        beforeSave: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.isNewRecord || user.changed("password")) {
                user.password = yield bcrypt_1.default.hash(user.password.toString(), 10);
            }
        }),
    },
});
exports.User.prototype.checkPassword = function (password, callbackFunction) {
    bcrypt_1.default.compare(password, this.password, (err, isSame) => {
        if (err) {
            callbackFunction(err);
        }
        else {
            callbackFunction(err, isSame);
        }
    });
};
