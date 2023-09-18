"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResourceOptions = void 0;
exports.postResourceOptions = {
    navigation: "Administração",
    editProperties: ["message", "userId", "mediaProductId", "imageUrls"],
    filterProperties: [
        "message",
        "userId",
        "mediaProductId",
        "createdAt",
        "updatedAt",
    ],
    listProperties: ["message", "userId", "imageUrls", "mediaProductId"],
    showProperties: [
        "id",
        "message",
        "imageUrls",
        "userId",
        "mediaProductId",
        "createdAt",
        "updatedAt",
    ],
};
