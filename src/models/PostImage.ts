import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface PostImage {
  id: number;
  imageUrl: string;
  postId: number;
}

export interface PostImageCreationsAttributes
  extends Optional<PostImage, "id"> {}

export interface PostImageInstance
  extends Model<PostImage, PostImageCreationsAttributes>,
    PostImage {}

export const PostImage = sequelize.define<PostImageInstance, PostImage>(
  "PostImage",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "posts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);
