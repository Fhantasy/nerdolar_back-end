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
exports.postService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const Post_1 = require("../models/Post");
const followService_1 = require("./followService");
const sequelize_2 = require("sequelize");
exports.postService = {
    create: (params, images) => __awaiter(void 0, void 0, void 0, function* () {
        if (!images) {
            const post = yield Post_1.Post.create(params);
            return post;
        }
        else {
            const imageUrls = images.map((image) => {
                return image.path;
            });
            const post = yield Post_1.Post.create(Object.assign(Object.assign({}, params), { imageUrls }));
            return post;
        }
    }),
    getOne: (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield Post_1.Post.findByPk(id, {
            attributes: [
                "id",
                "message",
                ["image_urls", "imageUrls"],
                ["created_at", "createdAt"],
                [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("Likes.id")), "likes"],
            ],
            include: [
                {
                    model: models_1.Like,
                    attributes: [],
                },
                {
                    model: models_1.User,
                    as: "liked",
                    attributes: ["nickname"],
                    through: { attributes: [] },
                    where: { id: userId },
                    required: false,
                },
                {
                    model: models_1.User,
                    attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
                },
                {
                    model: models_1.MediaProduct,
                    attributes: [
                        "id",
                        "title",
                        ["thumbnail_img", "thumbnailImg"],
                        ["category_id", "categoryId"],
                    ],
                    include: [{ model: models_1.Category, as: "category", attributes: ["name"] }],
                },
                {
                    model: models_1.Comment,
                    as: "comments",
                    attributes: ["id", "message", ["created_at", "createdAt"]],
                    include: [
                        {
                            model: models_1.User,
                            as: "user",
                            attributes: [
                                "id",
                                "nickname",
                                "name",
                                ["profile_img", "profileImg"],
                            ],
                        },
                    ],
                },
            ],
            group: [
                "Post.id",
                "User.id",
                "liked.id",
                "liked->Like.id",
                "MediaProduct.id",
                "MediaProduct->category.id",
                "comments.id",
                "comments->user.id",
            ],
        });
        return post;
    }),
    getAllFromUser: (userId, currentUserId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield Post_1.Post.findAndCountAll({
            where: {
                userId,
            },
            attributes: [
                "id",
                "message",
                ["image_urls", "imageUrls"],
                ["created_at", "createdAt"],
                [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("Likes.id")), "likes"],
            ],
            include: [
                {
                    model: models_1.Like,
                    attributes: [],
                },
                {
                    model: models_1.User,
                    as: "liked",
                    attributes: ["nickname"],
                    through: { attributes: [] },
                    where: { id: currentUserId },
                    required: false,
                },
                {
                    model: models_1.User,
                    attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
                },
                {
                    model: models_1.MediaProduct,
                    attributes: [
                        "id",
                        "title",
                        ["thumbnail_img", "thumbnailImg"],
                        ["category_id", "categoryId"],
                    ],
                    include: [{ model: models_1.Category, as: "category", attributes: ["name"] }],
                },
            ],
            limit: perPage,
            offset,
            order: [["created_at", "DESC"]],
            distinct: true,
            subQuery: false,
            group: [
                "Post.id",
                "liked.id",
                "liked->Like.id",
                "User.id",
                "MediaProduct.id",
                "MediaProduct->category.id",
            ],
        });
        return {
            posts: rows,
            page,
            perPage,
            total: count.length,
        };
    }),
    getAllFromMedia: (userId, mediaProductId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield Post_1.Post.findAndCountAll({
            where: {
                mediaProductId,
            },
            attributes: [
                "id",
                "message",
                ["image_urls", "imageUrls"],
                ["created_at", "createdAt"],
                [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("Likes.id")), "likes"],
            ],
            include: [
                {
                    model: models_1.Like,
                    attributes: [],
                },
                {
                    model: models_1.User,
                    as: "liked",
                    attributes: ["nickname"],
                    through: { attributes: [] },
                    where: { id: userId },
                    required: false,
                },
                {
                    model: models_1.User,
                    attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
                },
                {
                    model: models_1.MediaProduct,
                    attributes: [
                        "id",
                        "title",
                        ["thumbnail_img", "thumbnailImg"],
                        ["category_id", "categoryId"],
                    ],
                    include: [{ model: models_1.Category, as: "category", attributes: ["name"] }],
                },
            ],
            limit: perPage,
            offset,
            order: [["created_at", "DESC"]],
            distinct: true,
            subQuery: false,
            group: [
                "Post.id",
                "liked.id",
                "liked->Like.id",
                "User.id",
                "MediaProduct.id",
                "MediaProduct->category.id",
            ],
        });
        return {
            posts: rows,
            page,
            perPage,
            total: count.length,
        };
    }),
    feed: (userId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const followingUsers = yield followService_1.followService.getFollowings(userId, 1, 999999);
        let postsPromises = followingUsers.followings.map((followingUser) => __awaiter(void 0, void 0, void 0, function* () {
            const posts = yield exports.postService.getAllFromUser(followingUser.follow.id, userId, 1, 5);
            return [...posts.posts];
        }));
        const postsFromAllFollowings = yield Promise.all(postsPromises);
        let posts = [];
        postsFromAllFollowings.forEach((postsGroup) => {
            posts = [...posts, ...postsGroup];
        });
        posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const postsPaginated = posts.splice(offset, perPage);
        return postsPaginated;
    }),
    findByMessage: (term, currentUserId, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield Post_1.Post.findAndCountAll({
            where: {
                message: {
                    [sequelize_2.Op.iLike]: `%${term}%`,
                },
            },
            attributes: [
                "id",
                "message",
                ["image_urls", "imageUrls"],
                ["created_at", "createdAt"],
                [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("Likes.id")), "likes"],
            ],
            include: [
                {
                    model: models_1.Like,
                    attributes: [],
                },
                {
                    model: models_1.User,
                    as: "liked",
                    attributes: ["nickname"],
                    through: { attributes: [] },
                    where: { id: currentUserId },
                    required: false,
                },
                {
                    model: models_1.User,
                    attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
                },
                {
                    model: models_1.MediaProduct,
                    attributes: [
                        "id",
                        "title",
                        ["thumbnail_img", "thumbnailImg"],
                        ["category_id", "categoryId"],
                    ],
                    include: [{ model: models_1.Category, as: "category", attributes: ["name"] }],
                },
            ],
            limit: perPage,
            offset,
            order: [["created_at", "DESC"]],
            distinct: true,
            subQuery: false,
            group: [
                "Post.id",
                "liked.id",
                "liked->Like.id",
                "User.id",
                "MediaProduct.id",
                "MediaProduct->category.id",
            ],
        });
        return {
            posts: rows,
            page,
            perPage,
            total: count.length,
        };
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield Post_1.Post.destroy({ where: { id } });
    }),
};
