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
exports.UserController = exports.uploadProfileImagesMiddleware = void 0;
const userService_1 = require("../services/userService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const upload_1 = require("../services/upload");
const fs_1 = __importDefault(require("fs"));
const uploadProfileImages = (0, upload_1.upload)("users").fields([
    { name: "profileImg", maxCount: 1 },
    { name: "profileBannerImg", maxCount: 1 },
]);
function uploadProfileImagesMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        uploadProfileImages(req, res, (error) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            next();
        });
    });
}
exports.uploadProfileImagesMiddleware = uploadProfileImagesMiddleware;
exports.UserController = {
    //GET /users/:nickname
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = req.user;
        const { nickname } = req.params;
        try {
            const user = yield userService_1.userService.show(nickname, currentUser.id);
            if (!user)
                throw new Error("User not found!");
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /users/search
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== "string") {
                throw new Error("Query title must be of type string");
            }
            const user = yield userService_1.userService.findByNameOrNickname(name, page, perPage);
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //GET /users/current
    currentUserData: (req, res) => {
        const user = req.user;
        try {
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ message: error.message });
            }
            return error;
        }
    },
    //PUT /users/current/profile
    profileUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const user = req.user;
        const { name, bio, birth, locale } = req.body;
        const images = req.files;
        const profileImg = (_a = images.profileImg) === null || _a === void 0 ? void 0 : _a[0].path;
        const profileBannerImg = (_b = images.profileBannerImg) === null || _b === void 0 ? void 0 : _b[0].path;
        let params = { name, bio, locale };
        if (profileImg) {
            params.profileImg = profileImg;
        }
        if (profileBannerImg) {
            params.profileBannerImg = profileBannerImg;
        }
        if (birth) {
            params.birth = birth;
        }
        try {
            yield userService_1.userService.profileUpdate(user, params);
            res.status(204).send();
        }
        catch (error) {
            if (profileImg) {
                fs_1.default.unlink(profileImg, () => { });
            }
            if (profileBannerImg) {
                fs_1.default.unlink(profileBannerImg, () => { });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //PUT /users/current/account
    accountDataUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { nickname, email } = req.body;
        try {
            yield userService_1.userService.accountDataUpdate(user.id, {
                nickname,
                email,
            });
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //PUT /users/current/password
    passwordUpdate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        user.checkPassword(currentPassword, (error, isSame) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (error)
                    throw error;
                if (!isSame)
                    throw new Error("Senha atual incorreta!");
                yield userService_1.userService.passwordUpdate(user.id, newPassword);
                return res.status(204).send();
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message });
                }
                return error;
            }
        }));
    }),
    //DELETE /users/current
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        try {
            yield userService_1.userService.delete(user.id);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
