import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface Like {
  id: number;
  userId: number;
  postId: number;
}

export interface LikeCreationsAttributes extends Optional<Like, "id"> {}

export interface LikeInstance
  extends Model<Like, LikeCreationsAttributes>,
    Like {}

export const Like = sequelize.define<LikeInstance, Like>("Like", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
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
