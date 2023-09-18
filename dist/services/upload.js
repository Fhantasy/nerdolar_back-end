"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
function upload(folder) {
    return (0, multer_1.default)({
        storage: multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                var _a;
                const path = `public/${folder}/${(_a = req.user) === null || _a === void 0 ? void 0 : _a.id}`;
                fs_1.default.mkdirSync(path, { recursive: true });
                cb(null, path);
            },
            filename: (req, file, cb) => {
                cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
            },
        }),
        limits: { fileSize: 5 * 1048576 },
        fileFilter(req, file, cb) {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Error: Unacceptable file format"));
            }
        },
    });
}
exports.upload = upload;
