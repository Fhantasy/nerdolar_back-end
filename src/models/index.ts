import { Category } from "./Category";
import { Comment } from "./Comment";
import { Follow } from "./Follow";
import { Genre } from "./Genre";
import { Like } from "./Like";
import { MediaGenre } from "./MediaGenre";
import { MediaProduct } from "./MediaProduct";
import { Post } from "./Post";
import { User } from "./User";
import { WatchItem } from "./WatchItem";

MediaProduct.belongsTo(Category, { as: "category" });
Category.hasMany(MediaProduct);

WatchItem.belongsTo(Category);
Category.hasMany(WatchItem, { as: "watchItens" });

MediaProduct.hasMany(WatchItem, { as: "watchItens" });

MediaProduct.belongsToMany(Genre, {
  through: MediaGenre,
  as: "genres",
});
Genre.belongsToMany(MediaProduct, {
  through: MediaGenre,
  as: "mediaProducts",
});

Post.belongsTo(MediaProduct);
MediaProduct.hasMany(Post);

Post.belongsTo(User);
User.hasMany(Post, { as: "posts" });

User.hasMany(Follow, { as: "followeds", foreignKey: "user_followed_id" });
User.hasMany(Follow, { as: "followings", foreignKey: "user_following_id" });

Post.belongsToMany(User, { through: Comment });
User.belongsToMany(Post, { through: Comment });

Post.hasMany(Comment, { as: "comments", foreignKey: "post_id" });
Comment.belongsTo(User, { as: "user", foreignKey: "user_id" });

Post.belongsToMany(User, { through: Like, as: "liked", foreignKey: "post_id" });
User.belongsToMany(Post, { through: Like });

Like.belongsTo(Post);
Post.hasMany(Like);

User.belongsToMany(MediaProduct, { through: WatchItem });
MediaProduct.belongsToMany(User, { through: WatchItem });

User.hasMany(WatchItem, { as: "watchIten", foreignKey: "user_id" });
WatchItem.belongsTo(MediaProduct, {
  as: "mediaProduct",
  foreignKey: "media_product_id",
});

Follow.belongsTo(User, { foreignKey: "user_followed_id", as: "follow" });
Follow.belongsTo(User, { foreignKey: "user_following_id", as: "follower" });

User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_following_id",
  as: "following",
});
User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_followed_id",
  as: "followers",
});

export {
  User,
  Category,
  Comment,
  Follow,
  Genre,
  Like,
  MediaGenre,
  MediaProduct,
  Post,
};
