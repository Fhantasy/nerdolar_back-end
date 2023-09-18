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
exports.EnsureAuth = void 0;
const jwtService_1 = require("../services/jwtService");
const userService_1 = require("../services/userService");
function EnsureAuth(req, res, next) {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        return res.status(401).json({ message: "Not Authorized: Token not found" });
    }
    const token = authorizationToken.replace(/Bearer /, "");
    jwtService_1.jwtService.verifyToken(token, (error, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (error || typeof decoded === "undefined") {
            return res.status(401).json({ message: "Not Authorized: Invalid token" });
        }
        const user = yield userService_1.userService.findByEmail(decoded.email);
        req.user = user;
        next();
    }));
}
exports.EnsureAuth = EnsureAuth;
