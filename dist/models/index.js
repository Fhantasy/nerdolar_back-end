"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.MediaProduct = exports.MediaGenre = exports.Like = exports.Genre = exports.Follow = exports.Comment = exports.Category = exports.User = void 0;
const Category_1 = require("./Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return Category_1.Category; } });
const Comment_1 = require("./Comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return Comment_1.Comment; } });
const Follow_1 = require("./Follow");
Object.defineProperty(exports, "Follow", { enumerable: true, get: function () { return Follow_1.Follow; } });
const Genre_1 = require("./Genre");
Object.defineProperty(exports, "Genre", { enumerable: true, get: function () { return Genre_1.Genre; } });
const Like_1 = require("./Like");
Object.defineProperty(exports, "Like", { enumerable: true, get: function () { return Like_1.Like; } });
const MediaGenre_1 = require("./MediaGenre");
Object.defineProperty(exports, "MediaGenre", { enumerable: true, get: function () { return MediaGenre_1.MediaGenre; } });
const MediaProduct_1 = require("./MediaProduct");
Object.defineProperty(exports, "MediaProduct", { enumerable: true, get: function () { return MediaProduct_1.MediaProduct; } });
const Post_1 = require("./Post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Post_1.Post; } });
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const WatchItem_1 = require("./WatchItem");
MediaProduct_1.MediaProduct.belongsTo(Category_1.Category, { as: "category" });
Category_1.Category.hasMany(MediaProduct_1.MediaProduct);
WatchItem_1.WatchItem.belongsTo(Category_1.Category);
Category_1.Category.hasMany(WatchItem_1.WatchItem, { as: "watchItens" });
MediaProduct_1.MediaProduct.hasMany(WatchItem_1.WatchItem, { as: "watchItens" });
MediaProduct_1.MediaProduct.belongsToMany(Genre_1.Genre, {
    through: MediaGenre_1.MediaGenre,
    as: "genres",
});
Genre_1.Genre.belongsToMany(MediaProduct_1.MediaProduct, {
    through: MediaGenre_1.MediaGenre,
    as: "mediaProducts",
});
Post_1.Post.belongsTo(MediaProduct_1.MediaProduct);
MediaProduct_1.MediaProduct.hasMany(Post_1.Post);
Post_1.Post.belongsTo(User_1.User);
User_1.User.hasMany(Post_1.Post, { as: "posts" });
User_1.User.hasMany(Follow_1.Follow, { as: "followeds", foreignKey: "user_followed_id" });
User_1.User.hasMany(Follow_1.Follow, { as: "followings", foreignKey: "user_following_id" });
Post_1.Post.belongsToMany(User_1.User, { through: Comment_1.Comment });
User_1.User.belongsToMany(Post_1.Post, { through: Comment_1.Comment });
Post_1.Post.hasMany(Comment_1.Comment, { as: "comments", foreignKey: "post_id" });
Comment_1.Comment.belongsTo(User_1.User, { as: "user", foreignKey: "user_id" });
Post_1.Post.belongsToMany(User_1.User, { through: Like_1.Like, as: "liked", foreignKey: "post_id" });
User_1.User.belongsToMany(Post_1.Post, { through: Like_1.Like });
Like_1.Like.belongsTo(Post_1.Post);
Post_1.Post.hasMany(Like_1.Like);
User_1.User.belongsToMany(MediaProduct_1.MediaProduct, { through: WatchItem_1.WatchItem });
MediaProduct_1.MediaProduct.belongsToMany(User_1.User, { through: WatchItem_1.WatchItem });
User_1.User.hasMany(WatchItem_1.WatchItem, { as: "watchIten", foreignKey: "user_id" });
WatchItem_1.WatchItem.belongsTo(MediaProduct_1.MediaProduct, {
    as: "mediaProduct",
    foreignKey: "media_product_id",
});
Follow_1.Follow.belongsTo(User_1.User, { foreignKey: "user_followed_id", as: "follow" });
Follow_1.Follow.belongsTo(User_1.User, { foreignKey: "user_following_id", as: "follower" });
User_1.User.belongsToMany(User_1.User, {
    through: Follow_1.Follow,
    foreignKey: "user_following_id",
    as: "following",
});
User_1.User.belongsToMany(User_1.User, {
    through: Follow_1.Follow,
    foreignKey: "user_followed_id",
    as: "followers",
});
