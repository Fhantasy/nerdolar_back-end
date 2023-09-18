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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = exports.uploadPostImageMiddleware = void 0;
const postService_1 = require("../services/postService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const fs_1 = __importDefault(require("fs"));
const upload_1 = require("../services/upload");
const uploadPostImage = (0, upload_1.upload)("post-images").array("images");
function uploadPostImageMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadPostImage(req, res, (error) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            next();
        });
    });
}
exports.uploadPostImageMiddleware = uploadPostImageMiddleware;
exports.PostController = {
    //POST /posts
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { message, mediaProductId } = req.body;
        const images = req.files;
        try {
            yield postService_1.postService.create({
                message,
                userId: user.id,
                mediaProductId,
            }, images ? images : undefined);
            res.status(201).send();
        }
        catch (error) {
            if (images) {
                images.forEach((image) => {
                    fs_1.default.unlink(image.path, () => { });
                });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /posts/:id
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            const post = yield postService_1.postService.getOne(Number(id), user.id);
            if (!post)
                return res.status(404).json({ message: "Post not found" });
            return res.status(200).json(post);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /posts/user/:id
    allFromUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const posts = yield postService_1.postService.getAllFromUser(Number(id), user.id, page, perPage);
            console.log(posts);
            res.status(200).json(posts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /posts/media-product/:id
    allFromMedia: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const posts = yield postService_1.postService.getAllFromMedia(user.id, Number(id), page, perPage);
            res.status(200).json(posts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /posts/search
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name === "string") {
                const posts = yield postService_1.postService.findByMessage(name, user.id, page, perPage);
                res.status(200).json(posts);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /feed
    feed: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const posts = yield postService_1.postService.feed(user.id, page, perPage);
            res.status(200).json(posts);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //DELETE /posts/:id
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield postService_1.postService.delete(Number(id));
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
