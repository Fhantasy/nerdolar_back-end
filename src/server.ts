import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";
import { adminJs, adminJsRouter } from "./adminJs";
import cors from "cors";
import { mediaProductService } from "./services/mediaProductService";
import { sequelize } from "./database";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/public", express.static("public"));

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection sussccefull");
  });
  console.log("Conectado");
});
