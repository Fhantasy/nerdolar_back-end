import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface MediaGenre {
  id: number;
  mediaProductId: number;
  genreId: number;
}

export interface MediaGenreCreationsAttributes
  extends Optional<MediaGenre, "id"> {}

export interface MediaGenreInstance
  extends Model<MediaGenre, MediaGenreCreationsAttributes>,
    MediaGenre {}

export const MediaGenre = sequelize.define<MediaGenreInstance, MediaGenre>(
  "MediaGenre",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    mediaProductId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "media_products", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "genres", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);
