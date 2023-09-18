"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJSResources = void 0;
const category_1 = require("./category");
const user_1 = require("./user");
const models_1 = require("../../models");
const comment_1 = require("./comment");
const follow_1 = require("./follow");
const genre_1 = require("./genre");
const like_1 = require("./like");
const mediaGenre_1 = require("./mediaGenre");
const mediaProduct_1 = require("./mediaProduct");
const WatchItem_1 = require("../../models/WatchItem");
const watchItem_1 = require("./watchItem");
const post_1 = require("./post");
exports.adminJSResources = [
    {
        resource: models_1.Category,
        options: category_1.categoryResourceOptions,
    },
    {
        resource: models_1.User,
        options: user_1.userResourceOptions,
        features: user_1.userResourceFeatures,
    },
    {
        resource: models_1.Comment,
        options: comment_1.commentResourceOptions,
    },
    {
        resource: models_1.Follow,
        options: follow_1.followResourceOptions,
    },
    {
        resource: models_1.Genre,
        options: genre_1.genreResourceOptions,
    },
    {
        resource: models_1.Like,
        options: like_1.likeResourceOptions,
    },
    {
        resource: models_1.MediaGenre,
        options: mediaGenre_1.mediaGenreResourceOptions,
    },
    {
        resource: models_1.MediaProduct,
        options: mediaProduct_1.mediaProductResourceOptions,
        features: mediaProduct_1.mediaProductsResourceFeatures,
    },
    {
        resource: models_1.Post,
        options: post_1.postResourceOptions,
    },
    {
        resource: WatchItem_1.WatchItem,
        options: watchItem_1.watchItemResourceOptions,
    },
];
