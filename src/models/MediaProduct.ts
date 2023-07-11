import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface MediaProduct {
  id: number;
  title: string;
  sinopsys: string;
  status: string;
  isEpisodic: boolean;
  launchDate: Date;
  endDate: Date;
  totalEpisodes: number;
  currentEpisode: number;
  releaseDate: Date;
  thumbnailImg: string;
  pageBannerImg: string;
  categoryId: number;
}

export interface MediaProductCreationsAttributes
  extends Optional<
    MediaProduct,
    "id" | "endDate" | "totalEpisodes" | "currentEpisode" | "releaseDate"
  > {}

export interface MediaProductInstance
  extends Model<MediaProduct, MediaProductCreationsAttributes>,
    MediaProduct {}

export const MediaProduct = sequelize.define<
  MediaProductInstance,
  MediaProduct
>("MediaProduct", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  sinopsys: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isEpisodic: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  launchDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  endDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  totalEpisodes: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  currentEpisode: {
    allowNull: true,
    type: DataTypes.FLOAT,
  },
  releaseDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  thumbnailImg: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  pageBannerImg: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
