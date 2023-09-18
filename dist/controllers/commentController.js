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
exports.CommentController = void 0;
const commentService_1 = require("../services/commentService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
exports.CommentController = {
    //POST /comment
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { message, postId } = req.body;
        try {
            yield commentService_1.commentService.create({ message, userId: user.id, postId });
            res.status(201).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /comments/:postId
    getAllFromPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId } = req.params;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const comments = yield commentService_1.commentService.getAllFromPost(Number(postId), page, perPage);
            return res.status(200).json(comments);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //DELETE /comment/:id
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            yield commentService_1.commentService.delete(user.id, Number(id));
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
