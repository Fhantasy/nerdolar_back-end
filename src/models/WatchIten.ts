import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface WatchIten {
  id: number;
  status: string;
  currentEpisode: number;
  userId: number;
  mediaProductId: number;
}

export interface WatchItenCreationsAttributes
  extends Optional<WatchIten, "id" | "status" | "currentEpisode"> {}

export interface WatchItenInstance
  extends Model<WatchIten, WatchItenCreationsAttributes>,
    WatchIten {}

export const WatchIten = sequelize.define<WatchItenInstance, WatchIten>(
  "WatchIten",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      allowNull: false,
      defaultValue: "Assistindo",
      type: DataTypes.STRING,
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
  }
);
