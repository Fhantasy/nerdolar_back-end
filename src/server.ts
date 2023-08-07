import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";
import { adminJs, adminJsRouter } from "./adminJs";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/public", express.static("public"));

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

app.listen(3000, () => {
  console.log("Conectado");
});
