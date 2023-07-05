import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreCreationsAttributes extends Optional<Genre, "id"> {}

export interface GenreInstance
  extends Model<Genre, GenreCreationsAttributes>,
    Genre {}

export const Genre = sequelize.define<GenreInstance, Genre>("Genre", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});
