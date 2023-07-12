import express from "express";
import { UserController } from "./controllers/userController";
import { CategoryController } from "./controllers/categoryController";
import { AuthController } from "./controllers/authController";
import { EnsureAuth } from "./middlewares/auth";
import { MediaProductController } from "./controllers/mediaProductController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/users/current", EnsureAuth, UserController.currentUserData);
router.get("/users/search", EnsureAuth, UserController.search);
router.delete("/users/current", EnsureAuth, UserController.delete);
router.get("/users/:nickname", UserController.show);
router.put("/users/current/profile", EnsureAuth, UserController.profileUpdate);
router.put(
  "/users/current/account",
  EnsureAuth,
  UserController.accountDataUpdate
);
router.put(
  "/users/current/password",
  EnsureAuth,
  UserController.passwordUpdate
);

router.get("/categories", CategoryController.all);
router.get("/categories/:id", CategoryController.show);

router.get("/media-products", MediaProductController.all);
router.get("/media-products/search", MediaProductController.search);

export { router };
