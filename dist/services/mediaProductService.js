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
exports.mediaProductService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const WatchItem_1 = require("../models/WatchItem");
exports.mediaProductService = {
    all: (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield models_1.MediaProduct.findAndCountAll({
            include: {
                model: models_1.Category,
                as: "category",
                attributes: ["name"],
            },
            offset: offset,
            limit: perPage,
            distinct: true,
        });
        return {
            mediaProducts: rows,
            page,
            perPage,
            total: count,
        };
    }),
    getOne: (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const mediaProduct = yield models_1.MediaProduct.findByPk(id, {
            include: [
                {
                    model: WatchItem_1.WatchItem,
                    as: "watchItens",
                    attributes: ["id"],
                    where: {
                        user_id: userId,
                    },
                    required: false,
                },
                {
                    model: models_1.Category,
                    as: "category",
                    attributes: ["id", "name"],
                },
                {
                    model: models_1.Genre,
                    as: "genres",
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            ],
        });
        return mediaProduct;
    }),
    findByTitle: (title, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
        const offset = (page - 1) * perPage;
        const { count, rows } = yield models_1.MediaProduct.findAndCountAll({
            where: {
                title: {
                    [sequelize_1.Op.iLike]: `%${title}%`,
                },
            },
            include: [
                {
                    model: models_1.Category,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: models_1.Genre,
                    as: "genres",
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            ],
            offset: offset,
            limit: perPage,
            distinct: true,
        });
        return {
            mediaProducts: rows,
            page,
            perPage,
            total: count,
        };
    }),
    updateStatus: () => __awaiter(void 0, void 0, void 0, function* () {
        const mediasOngoing = yield models_1.MediaProduct.findAll({
            where: { status: "ongoing" },
        });
        mediasOngoing.forEach((mediaProduct) => __awaiter(void 0, void 0, void 0, function* () {
            mediaProduct.releaseDates.forEach((date, index) => __awaiter(void 0, void 0, void 0, function* () {
                if (date < new Date()) {
                    const datesUpdated = [...mediaProduct.releaseDates];
                    datesUpdated.splice(index, index + 1);
                    yield mediaProduct.update({
                        currentEpisode: mediaProduct.currentEpisode + 1,
                        releaseDates: datesUpdated,
                        status: mediaProduct.currentEpisode + 1 >= mediaProduct.totalEpisodes
                            ? "complete"
                            : "ongoing",
                        endDate: mediaProduct.currentEpisode + 1 >= mediaProduct.totalEpisodes
                            ? date
                            : undefined,
                    });
                }
            }));
        }));
        console.log("Media products updated!");
    }),
};
