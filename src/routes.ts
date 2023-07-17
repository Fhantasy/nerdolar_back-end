import express from "express";
import { UserController } from "./controllers/userController";
import { CategoryController } from "./controllers/categoryController";
import { AuthController } from "./controllers/authController";
import { EnsureAuth } from "./middlewares/auth";
import { MediaProductController } from "./controllers/mediaProductController";
import { FollowController } from "./controllers/followContoller";
import { PostController } from "./controllers/postController";
import { CommentController } from "./controllers/commentController";
import { LikeController } from "./controllers/likeController";
import { WatchItenController } from "./controllers/watchItenController";

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

router.post("/follow", EnsureAuth, FollowController.follow);
router.delete("/follow", EnsureAuth, FollowController.unfollow);
router.get("/followers", EnsureAuth, FollowController.getFollowers);
router.get("/followings", EnsureAuth, FollowController.getFollowings);

router.post("/posts", EnsureAuth, PostController.create);
router.delete("/posts/:id", EnsureAuth, PostController.delete);
router.get("/posts/:id", EnsureAuth, PostController.show);
router.get("/posts/user/:id", EnsureAuth, PostController.allFromUser);
router.post("/posts/search", EnsureAuth, PostController.search);
router.get("/feed", EnsureAuth, PostController.feed);

router.post("/comment", EnsureAuth, CommentController.create);
router.delete("/comment/:id", EnsureAuth, CommentController.delete);

router.post("/like", EnsureAuth, LikeController.create);
router.delete("/like", EnsureAuth, LikeController.delete);

router.post("/watchIten", EnsureAuth, WatchItenController.create);
router.delete("/watchIten/:id", EnsureAuth, WatchItenController.delete);
router.put("/watchIten", EnsureAuth, WatchItenController.update);
router.get("/watchItens", EnsureAuth, WatchItenController.getAllFromUser);
router.get("/watchIten/:id", EnsureAuth, WatchItenController.getOne);

export { router };
