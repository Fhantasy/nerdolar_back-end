import { Category } from "./Category";
import { MediaProduct } from "./MediaProduct";

MediaProduct.belongsTo(Category);
Category.hasMany(MediaProduct);
