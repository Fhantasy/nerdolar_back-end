import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";
import { UserInstance } from "./User";

export interface Follow {
  id: number;
  userFollowingId: number;
  userFollowedId: number;
}

export interface FollowCreationsAttributes extends Optional<Follow, "id"> {}

export interface FollowInstance
  extends Model<Follow, FollowCreationsAttributes>,
    Follow {
  follow?: UserInstance;
}

export const Follow = sequelize.define<FollowInstance, Follow>("Follow", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userFollowingId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  userFollowedId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
