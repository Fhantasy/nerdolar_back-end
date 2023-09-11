import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface WatchItem {
  id: number;
  status: string;
  currentEpisode: number;
  userId: number;
  mediaProductId: number;
  categoryId: number;
}

export interface WatchItemCreationsAttributes
  extends Optional<WatchItem, "id" | "status" | "currentEpisode"> {}

export interface WatchItemInstance
  extends Model<WatchItem, WatchItemCreationsAttributes>,
    WatchItem {
  mediaProduct?: { category: { name: string } };
}

export const WatchItem = sequelize.define<WatchItemInstance, WatchItem>(
  "WatchItem",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      defaultValue: "ongoing",
      type: DataTypes.STRING,
      validate: {
        isIn: [["ongoing", "complete"]],
      },
    },
    currentEpisode: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.FLOAT,
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
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);
