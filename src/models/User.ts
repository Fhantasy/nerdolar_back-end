import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";

export interface User {
  id: number;
  nickname: string;
  email: string;
  password: string;
  locale: string;
  role: "admin" | "user";
  name: string;
  bio: string;
  birth: Date;
}

export interface UserCreationsAttributes
  extends Optional<User, "id" | "locale" | "bio" | "birth"> {}

export interface UserInstance
  extends Model<User, UserCreationsAttributes>,
    User {}

export const User = sequelize.define<UserInstance, User>("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nickname: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  locale: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isIn: [["admin", "user"]],
    },
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  bio: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  birth: {
    allowNull: true,
    type: DataTypes.DATE,
  },
});
