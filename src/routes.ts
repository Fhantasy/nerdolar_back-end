import express from "express";
import { UserController } from "./controllers/userController";
import { CategoryController } from "./controllers/categoryController";
import { MediaProductController } from "./controllers/mediaProductController";
import { AuthController } from "./controllers/authController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login)
router.get("/users/:id", UserController.show);

router.get("/categories", CategoryController.all);
router.get("/categories/:id", CategoryController.show);
router.post("/categories", CategoryController.create);
router.delete("/categories/:id", CategoryController.delete);

router.post("/media-product", MediaProductController.create);

export { router };
