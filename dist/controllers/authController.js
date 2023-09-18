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
exports.AuthController = void 0;
const userService_1 = require("../services/userService");
const jwtService_1 = require("../services/jwtService");
exports.AuthController = {
    //POST /register
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nickname, email, password } = req.body;
        try {
            const user = yield userService_1.userService.create({
                nickname: nickname,
                email: email,
                password: password,
                role: "user",
                name: nickname,
            });
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
    //POST /login
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield userService_1.userService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Email not resgistred!" });
            }
            user.checkPassword(password, (err, isSame) => {
                if (err)
                    return res.status(400).json({ message: err.message });
                if (!isSame)
                    return res.status(401).json({ message: "Incorrect password!" });
                const payload = {
                    id: user.id,
                    nickname: user.nickname,
                    email: user.email,
                };
                const token = jwtService_1.jwtService.signToken(payload, "1d");
                res.status(200).json({ token: token });
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return error;
        }
    }),
};
