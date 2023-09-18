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
exports.WatchItemController = void 0;
const watchItemService_1 = require("../services/watchItemService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
exports.WatchItemController = {
    //POST /watch-item
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { mediaProductId, categoryId } = req.body;
        try {
            const wacthItem = yield watchItemService_1.watchItemService.create({
                userId: user.id,
                mediaProductId,
                categoryId,
            });
            res.status(200).json({ id: wacthItem.id });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //DELETE /watchItem/:id
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            yield watchItemService_1.watchItemService.delete(user.id, Number(id));
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //PUT /watchItem
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { status, currentEpisode, watchItemId } = req.body;
        try {
            yield watchItemService_1.watchItemService.update({ status, currentEpisode }, watchItemId, user.id);
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /watchItem/:id
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            const watchItem = yield watchItemService_1.watchItemService.getOne(user.id, Number(id));
            if (!watchItem)
                res.status(404).json({ message: "WatchItem not found" });
            res.status(200).json(watchItem);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    getReleasesPerCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        try {
            const watchItems = yield watchItemService_1.watchItemService.getReleasesPerCategory(user.id);
            res.status(200).json(watchItems);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /watch-itens/category/:id/:userId?status=ongoing
    getAllPerCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const { categoryId } = req.params;
        const { status } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const watchItems = yield watchItemService_1.watchItemService.getAllPerCategory(Number(userId), Number(categoryId), status === "ongoing" || status === "complete" ? status : "ongoing", page, perPage);
            res.status(200).json(watchItems);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
