import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface Comment {
  id: number;
  message: string;
  userId: number;
  postId: number;
}

export interface CommentCreationsAttributes extends Optional<Comment, "id"> {}

export interface CommentInstance
  extends Model<Comment, CommentCreationsAttributes>,
    Comment {}

export const Comment = sequelize.define<CommentInstance, Comment>("Comment", {
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
  postId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "posts", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
