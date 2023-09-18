"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userResourceFeatures = exports.userResourceOptions = void 0;
const upload_1 = __importStar(require("@adminjs/upload"));
const fs_1 = __importStar(require("fs"));
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
exports.userResourceOptions = {
    navigation: "Administração",
    properties: {
        birth: {
            type: "date",
        },
        role: {
            availableValues: [
                { value: "admin", label: "Administrador" },
                { value: "user", label: "Usuário" },
            ],
        },
    },
    editProperties: [
        "nickname",
        "email",
        "password",
        "locale",
        "role",
        "name",
        "bio",
        "birth",
        "profileImage",
        "profileBannerImage",
    ],
    filterProperties: [
        "nickname",
        "email",
        "password",
        "locale",
        "role",
        "name",
        "bio",
        "birth",
        "createdAt",
        "updatedAt",
    ],
    listProperties: ["id", "nickname", "email", "role"],
    showProperties: [
        "id",
        "nickname",
        "email",
        "password",
        "locale",
        "role",
        "name",
        "bio",
        "birth",
        "createdAt",
        "updatedAt",
        "profileImage",
        "profileBannerImage",
    ],
};
class UploadProvider extends upload_1.BaseProvider {
    constructor() {
        super(path_1.default.join(__dirname, "../../../"));
        if (!(0, fs_1.existsSync)(path_1.default.join(__dirname, "../../../"))) {
            throw new Error(`directory: "${path_1.default.join(__dirname, "../../../")}" does not exists. Create it before running LocalAdapter`);
        }
    }
    // * Fixed this method because original does rename instead of move and it doesn't work with docker volume
    upload(file, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = process.platform === "win32" ? this.path(key) : this.path(key).slice(1); // adjusting file path according to OS
            yield fs_1.default.promises.mkdir(path_1.default.dirname(filePath), { recursive: true });
            yield (0, fs_extra_1.move)(file.path, filePath, { overwrite: true });
        });
    }
    delete(key, bucket) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.unlink(process.platform === "win32"
                ? this.path(key, bucket)
                : this.path(key, bucket).slice(1)); // adjusting file path according to OS
        });
    }
    // eslint-disable-next-line class-methods-use-this
    path(key, bucket) {
        // Windows doesn't requires the '/' in path, while UNIX system does
        return process.platform === "win32"
            ? `${path_1.default.join(bucket || this.bucket, key)}`
            : `/${path_1.default.join(bucket || this.bucket, key)}`;
    }
}
exports.userResourceFeatures = [
    (0, upload_1.default)({
        provider: new UploadProvider(),
        properties: {
            key: "profileImg",
            file: "profileImage",
            filePath: "profileImgPath",
            filesToDelete: "profileImgToDelete",
        },
        uploadPath: (record, filename) => `public/users/${record.get("id")}/${filename}`,
    }),
    (0, upload_1.default)({
        provider: new UploadProvider(),
        properties: {
            key: "profileBannerImg",
            file: "profileBannerImage",
            filePath: "profileBannerImgPath",
            filesToDelete: "profileBannerImgToDelete",
        },
        uploadPath: (record, filename) => `public/users/${record.get("id")}/${filename}`,
    }),
];
