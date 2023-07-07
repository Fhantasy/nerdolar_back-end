import { count } from "console";
import { User, UserCreationsAttributes } from "../models/User";
import { sequelize } from "../database";
import { Follow } from "../models";

export const userService = {
  create: async (params: UserCreationsAttributes) => {
    const user = await User.create(params);
    return user;
  },
  show: async (id: number) => {
    const user = await User.findByPk(id, {
      attributes: ["id", "nickname", "name", "bio"],
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id", "nickname", "bio", "name"],
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "nickname", "bio", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return user;
  },
};
