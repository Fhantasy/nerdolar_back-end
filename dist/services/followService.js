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
Object.defineProperty(exports, "__esModule", { value: true });
exports.followService = void 0;
const models_1 = require("../models");
exports.followService = {
    follow: (userFollowingId, userFollowedId) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.Follow.create({
            userFollowingId,
            userFollowedId,
        });
    }),
    unfollow: (userFollowingId, userFollowedId) => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.Follow.destroy({
            where: {
                userFollowedId,
                userFollowingId,
            },
        });
    }),
    getFollowers: (userId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield models_1.Follow.findAndCountAll({
            where: {
                userFollowedId: userId,
            },
            include: {
                model: models_1.User,
                as: "follower",
                attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
            },
            attributes: [],
            limit: perPage,
            offset,
        });
        return {
            followers: rows,
            page,
            perPage,
            total: count,
        };
    }),
    getFollowings: (userId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield models_1.Follow.findAndCountAll({
            where: {
                userFollowingId: userId,
            },
            include: {
                model: models_1.User,
                as: "follow",
                attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
            },
            attributes: [],
            limit: perPage,
            offset,
        });
        return {
            followings: rows,
            page,
            perPage,
            total: count,
        };
    }),
};
