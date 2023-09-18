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
exports.FollowController = void 0;
const followService_1 = require("../services/followService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
exports.FollowController = {
    //POST /follow
    follow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userToFollowId } = req.body;
        const user = req.user;
        try {
            yield followService_1.followService.follow(user.id, Number(userToFollowId));
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //DELETE /follow
    unfollow: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const user = req.user;
        try {
            yield followService_1.followService.unfollow(user.id, Number(userId));
            res.status(200).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /followers
    getFollowers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const followers = yield followService_1.followService.getFollowers(user.id, page, perPage);
            res.status(200).json(followers);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /followings
    getFollowings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const followings = yield followService_1.followService.getFollowings(user.id, page, perPage);
            res.status(200).json(followings);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
