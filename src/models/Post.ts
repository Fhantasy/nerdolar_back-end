import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface Post {
  id: number;
  message: string;
  userId: number;
  mediaProductId: number;
}

export interface PostCreationsAttributes extends Optional<Post, "id"> {}

export interface PostInstance
  extends Model<Post, PostCreationsAttributes>,
    Post {}

export const Post = sequelize.define<PostInstance, Post>("Post", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  message: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  mediaProductId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "media_products", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
