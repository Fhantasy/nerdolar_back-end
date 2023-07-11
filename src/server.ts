import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { router } from "./routes";
import { adminJs, adminJsRouter } from "./adminJs";

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

app.listen(3000, () => {
  console.log("Conectado");
});
