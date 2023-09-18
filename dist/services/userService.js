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
exports.userService = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const models_1 = require("../models");
const fs_1 = __importDefault(require("fs"));
exports.userService = {
    create: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const nicknameAlreadyExists = yield exports.userService.findByNickname(params.nickname);
        const emailAlreadyExists = yield exports.userService.findByEmail(params.email);
        if (nicknameAlreadyExists) {
            throw new Error("Apelido já existe");
        }
        if (emailAlreadyExists) {
            throw new Error("Email já existe");
        }
        const user = yield User_1.User.create(params);
        return user;
    }),
    show: (nickname, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: { nickname },
            attributes: [
                "id",
                "nickname",
                "name",
                "bio",
                "locale",
                "birth",
                ["profile_img", "profileImg"],
                ["profile_banner_img", "profileBannerImg"],
                [
                    sequelize_1.Sequelize.cast(sequelize_1.Sequelize.where(sequelize_1.Sequelize.col("followings.user_followed_id"), userId), "boolean"),
                    "isFollower",
                ],
                [
                    sequelize_1.Sequelize.cast(sequelize_1.Sequelize.where(sequelize_1.Sequelize.col("followeds.user_following_id"), userId), "boolean"),
                    "isFollowing",
                ],
            ],
            include: [
                {
                    model: models_1.Follow,
                    as: "followings",
                    attributes: [],
                },
                {
                    model: models_1.Follow,
                    as: "followeds",
                    attributes: [],
                },
                {
                    model: User_1.User,
                    as: "followers",
                    attributes: ["id", "nickname", "name"],
                    through: {
                        attributes: [],
                    },
                },
                {
                    model: User_1.User,
                    as: "following",
                    attributes: ["id", "nickname", "name"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        return user;
    }),
    findByNameOrNickname: (name, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield User_1.User.findAndCountAll({
            where: {
                [sequelize_1.Op.or]: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                    nickname: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                },
            },
            attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
            offset: offset,
            limit: perPage,
            distinct: true,
        });
        return {
            users: rows,
            page,
            perPage,
            total: count,
        };
    }),
    profileUpdate: (user, attributes) => __awaiter(void 0, void 0, void 0, function* () {
        if (attributes.profileImg) {
            if (user.profileImg) {
                fs_1.default.unlinkSync(user.profileImg);
            }
        }
        if (attributes.profileBannerImg) {
            if (user.profileBannerImg) {
                fs_1.default.unlinkSync(user.profileBannerImg);
            }
        }
        const [affectedRows, updatedUsers] = yield User_1.User.update(attributes, {
            where: { id: user.id },
            returning: true,
        });
        return updatedUsers[0];
    }),
    accountDataUpdate: (id, attributes) => __awaiter(void 0, void 0, void 0, function* () {
        const userEmailAlreadyExists = yield exports.userService.findByEmail(attributes.email);
        const userNicknameAlreadyExists = yield exports.userService.findByNickname(attributes.nickname);
        const user = yield User_1.User.findByPk(id);
        if (userEmailAlreadyExists) {
            if (userEmailAlreadyExists.id !== (user === null || user === void 0 ? void 0 : user.id)) {
                throw new Error("Email already exists!");
            }
        }
        if (userNicknameAlreadyExists) {
            if (userNicknameAlreadyExists.id !== (user === null || user === void 0 ? void 0 : user.id)) {
                throw new Error("Nickname already exists!");
            }
        }
        yield (user === null || user === void 0 ? void 0 : user.update(attributes));
    }),
    passwordUpdate: (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        const [affectedRows, updatedUsers] = yield User_1.User.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true,
        });
        return updatedUsers[0];
    }),
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: { email },
        });
        return user;
    }),
    findByNickname: (nickname) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            where: { nickname },
        });
        return user;
    }),
    delete: function name(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.User.destroy({ where: { id } });
        });
    },
};
