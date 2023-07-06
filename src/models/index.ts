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

MediaProduct.belongsTo(Category);
Category.hasMany(MediaProduct);

MediaProduct.belongsToMany(Genre, {
  through: MediaGenre,
  as: "mediaProducts",
});
Genre.belongsToMany(MediaProduct, {
  through: MediaGenre,
  as: "genres",
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

User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_following_id",
  as: "followings",
});
User.belongsToMany(User, {
  through: Follow,
  foreignKey: "user_followed_id",
  as: "followeds",
});
