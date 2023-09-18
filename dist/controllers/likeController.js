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
exports.LikeController = void 0;
const likeService_1 = require("../services/likeService");
exports.LikeController = {
    //POST /like
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { postId } = req.body;
        try {
            yield likeService_1.likeService.create({ userId: user.id, postId });
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //DELETE /like
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            yield likeService_1.likeService.delete(user.id, Number(id));
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
