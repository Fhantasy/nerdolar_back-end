import { Category } from "./Category";
import { Comment } from "./Comment";
import { Follow } from "./Follow";
import { Genre } from "./Genre";
import { Like } from "./Like";
import { MediaGenre } from "./MediaGenre";
import { MediaProduct } from "./MediaProduct";
import { Post } from "./Post";
import { PostImage } from "./PostImage";
import { User } from "./User";
import { WatchIten } from "./WatchIten";

MediaProduct.belongsTo(Category, { as: "category" });
Category.hasMany(MediaProduct);

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
User.hasMany(Post);

PostImage.belongsTo(Post);
Post.hasMany(PostImage);

Post.belongsToMany(User, { through: Comment });
User.belongsToMany(Post, { through: Comment });

Post.hasMany(Comment, { as: "comments", foreignKey: "post_id" });
User.hasMany(Comment, { as: "comments", foreignKey: "user_id" });

Post.belongsToMany(User, { through: Like });
User.belongsToMany(Post, { through: Like });

Post.belongsToMany(User, { through: Like });
User.belongsToMany(Post, { through: Like });

User.belongsToMany(MediaProduct, { through: WatchIten });
MediaProduct.belongsToMany(User, { through: WatchIten });

User.hasMany(WatchIten, { as: "watchIten", foreignKey: "user_id" });

Follow.belongsTo(User, { foreignKey: "user_followed_id", as: "follow" });
Follow.belongsTo(User, { foreignKey: "user_following_id", as: "follower" });

User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_following_id",
  as: "followers",
});
User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_followed_id",
  as: "following",
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
  PostImage,
};
