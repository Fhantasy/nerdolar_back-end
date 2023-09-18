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
exports.MediaProductController = void 0;
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const mediaProductService_1 = require("../services/mediaProductService");
exports.MediaProductController = {
    //GET /media-products/
    all: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const mediaProducts = yield mediaProductService_1.mediaProductService.all(page, perPage);
            return res.status(200).json(mediaProducts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /media-product/:id
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            const mediaProduct = yield mediaProductService_1.mediaProductService.getOne(Number(id), user.id);
            if (!mediaProduct)
                throw new Error("Media Product not found!");
            return res.status(200).json(mediaProduct);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /media-products/search/
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof title !== "string") {
                throw new Error("Query title must be of type string");
            }
            const mediaProducts = yield mediaProductService_1.mediaProductService.findByTitle(title, page, perPage);
            return res.status(200).json(mediaProducts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
