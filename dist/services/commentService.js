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
exports.commentService = void 0;
const models_1 = require("../models");
const Comment_1 = require("../models/Comment");
exports.commentService = {
    create: (params) => __awaiter(void 0, void 0, void 0, function* () {
        yield Comment_1.Comment.create(params);
    }),
    getAllFromPost: (postId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield Comment_1.Comment.findAndCountAll({
            where: { postId },
            attributes: ["id", "message", ["created_at", "createdAt"]],
            include: [
                {
                    model: models_1.User,
                    as: "user",
                    attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
                },
            ],
            distinct: true,
            limit: perPage,
            offset,
            order: [["created_at", "DESC"]],
        });
        return {
            comments: rows,
            page,
            perPage,
            total: count,
        };
    }),
    delete: (userId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
        yield Comment_1.Comment.destroy({
            where: {
                userId,
                id: commentId,
            },
        });
    }),
};
