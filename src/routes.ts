import express from "express";
import { UserController } from "./controllers/userController";
import { CategoryController } from "./controllers/categoryController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", UserController.create);
router.get("/users/:id", UserController.show);

router.get("/categories", CategoryController.all);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.create);
router.delete("/categories/:id", CategoryController.delete);

export { router };
