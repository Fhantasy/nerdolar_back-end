import express from "express";
import {
  UserController,
  uploadProfileImagesMiddleware,
} from "./controllers/userController";
import { CategoryController } from "./controllers/categoryController";
import { AuthController } from "./controllers/authController";
import { EnsureAuth } from "./middlewares/auth";
import { MediaProductController } from "./controllers/mediaProductController";
import { FollowController } from "./controllers/followContoller";
import {
  PostController,
  uploadPostImageMiddleware,
} from "./controllers/postController";
import { CommentController } from "./controllers/commentController";
import { LikeController } from "./controllers/likeController";
import { WatchItemController } from "./controllers/watchItemController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/users/current", EnsureAuth, UserController.currentUserData);
router.get("/users/search", EnsureAuth, UserController.search);
router.delete("/users/current", EnsureAuth, UserController.delete);
router.get("/users/:nickname", EnsureAuth, UserController.show);
router.put(
  "/users/current/profile",
  EnsureAuth,
  uploadProfileImagesMiddleware,
  UserController.profileUpdate
);
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

router.get("/categories/:id", EnsureAuth, CategoryController.show);

router.get("/media-products", EnsureAuth, MediaProductController.all);
router.get("/media-products/search", EnsureAuth, MediaProductController.search);
router.get("/media-product/:id", EnsureAuth, MediaProductController.getOne);

router.post("/follow", EnsureAuth, FollowController.follow);
router.delete("/follow/:userId", EnsureAuth, FollowController.unfollow);
router.get("/followers", EnsureAuth, FollowController.getFollowers);
router.get("/followings", EnsureAuth, FollowController.getFollowings);

router.post(
  "/posts",
  EnsureAuth,
  uploadPostImageMiddleware,
  PostController.create
);
router.get("/posts/search", EnsureAuth, PostController.search);
router.delete("/posts/:id", EnsureAuth, PostController.delete);
router.get("/posts/:id", EnsureAuth, PostController.show);
router.get("/posts/user/:id", EnsureAuth, PostController.allFromUser);
router.get("/posts/media-product/:id", EnsureAuth, PostController.allFromMedia);
router.get("/feed", EnsureAuth, PostController.feed);

router.post("/comment", EnsureAuth, CommentController.create);
router.get("/comments/:postId", EnsureAuth, CommentController.getAllFromPost);
router.delete("/comment/:id", EnsureAuth, CommentController.delete);

router.post("/like", EnsureAuth, LikeController.create);
router.delete("/like/:id", EnsureAuth, LikeController.delete);

router.post("/watch-item", EnsureAuth, WatchItemController.create);
router.put("/watch-item", EnsureAuth, WatchItemController.update);
router.get(
  "/watch-items/categories/:userId",
  EnsureAuth,
  CategoryController.getAllFromUserWatchList
);
router.get(
  "/watch-item/category/:categoryId/:userId",
  EnsureAuth,
  WatchItemController.getAllPerCategory
);
router.get("/watch-item/:id", EnsureAuth, WatchItemController.getOne);
router.delete("/watch-item/:id", EnsureAuth, WatchItemController.delete);
router.get("/releases", EnsureAuth, WatchItemController.getReleasesPerCategory);

export { router };
