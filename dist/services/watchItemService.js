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
exports.watchItemService = void 0;
const models_1 = require("../models");
const WatchItem_1 = require("../models/WatchItem");
exports.watchItemService = {
    create: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const watchItem = yield WatchItem_1.WatchItem.create(params);
        return watchItem;
    }),
    delete: (userId, watchItenid) => __awaiter(void 0, void 0, void 0, function* () {
        yield WatchItem_1.WatchItem.destroy({
            where: {
                userId,
                id: watchItenid,
            },
        });
    }),
    update: (attributes, watchItenId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield WatchItem_1.WatchItem.update(attributes, { where: { userId, id: watchItenId } });
    }),
    getOne: (userId, watchItenId) => __awaiter(void 0, void 0, void 0, function* () {
        const watchIten = yield WatchItem_1.WatchItem.findOne({
            attributes: ["id", "status", ["current_episode", "currentEpisode"]],
            where: {
                userId,
                id: watchItenId,
            },
            include: [
                {
                    model: models_1.MediaProduct,
                    as: "mediaProduct",
                    attributes: [
                        "id",
                        "title",
                        "status",
                        ["page_banner_img", "pageBannerImg"],
                        ["current_episode", "currentEpisode"],
                        ["total_episodes", "totalEpisodes"],
                    ],
                },
            ],
        });
        return watchIten;
    }),
    getReleasesPerCategory: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const watchItens = yield WatchItem_1.WatchItem.findAll({
            where: { userId, status: "ongoing", "$mediaProduct.status$": "ongoing" },
            attributes: ["id", "status", ["current_episode", "currentEpisode"]],
            include: [
                {
                    model: models_1.MediaProduct,
                    as: "mediaProduct",
                    attributes: [
                        "id",
                        "title",
                        "status",
                        ["current_episode", "currentEpisode"],
                        ["release_dates", "releaseDates"],
                    ],
                    include: [
                        {
                            model: models_1.Category,
                            as: "category",
                            attributes: ["name"],
                        },
                    ],
                },
            ],
            order: [["mediaProduct", "releaseDates", "ASC"]],
        });
        const watchItensPerCategory = watchItens.reduce((acumulateValue, wacthIten) => {
            if (acumulateValue[wacthIten.mediaProduct.category.name]) {
                acumulateValue[wacthIten.mediaProduct.category.name].push(wacthIten);
            }
            else {
                acumulateValue[wacthIten.mediaProduct.category.name] = [wacthIten];
            }
            return acumulateValue;
        }, {});
        return watchItensPerCategory;
    }),
    getAllPerCategory: (userId, categoryId, status, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { rows, count } = yield WatchItem_1.WatchItem.findAndCountAll({
            where: { userId, status, categoryId },
            attributes: ["id", "status", ["current_episode", "currentEpisode"]],
            include: [
                {
                    model: models_1.MediaProduct,
                    as: "mediaProduct",
                    attributes: [
                        "id",
                        "title",
                        "status",
                        ["is_episodic", "isEpisodic"],
                        ["thumbnail_img", "thumbnailImg"],
                        ["current_episode", "currentEpisode"],
                        ["total_episodes", "totalEpisodes"],
                    ],
                },
            ],
            order: [["currentEpisode", "ASC"]],
            limit: perPage,
            distinct: true,
            offset,
        });
        return {
            watchItens: rows,
            page,
            perPage,
            total: count,
        };
    }),
};
