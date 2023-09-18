"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResourceOptions = void 0;
exports.commentResourceOptions = {
    navigation: "Administração",
    editProperties: ["message", "userId", "postId"],
    filterProperties: ["message", "userId", "postId", "createdAt", "updatedAt"],
    listProperties: ["message", "userId", "postId"],
    showProperties: [
        "id",
        "message",
        "userId",
        "postId",
        "createdAt",
        "updatedAt",
    ],
};
