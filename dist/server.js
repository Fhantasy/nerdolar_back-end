"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const adminJs_1 = require("./adminJs");
const cors_1 = __importDefault(require("cors"));
const mediaProductService_1 = require("./services/mediaProductService");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/public", express_1.default.static("public"));
app.use(adminJs_1.adminJs.options.rootPath, adminJs_1.adminJsRouter);
app.use(routes_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Conectado");
});
setInterval(() => {
    mediaProductService_1.mediaProductService.updateStatus();
}, 60 * 1000);
