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
      attributes: [
        "id",
        "nickname",
        "name",
        "bio",
        "locale",
        "birth",
        ["profile_image", "profileImage"],
        ["profile_banner_image", "profileBannerImage"],
      ],
      include: [
        {
          model: User,
          as: "followers",
          attributes: ["id", "nickname", "name"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: "following",
          attributes: ["id", "nickname", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return user;
  },

  findByEmail: async (email: string) => {
    const user = await User.findAll({
      where: { email },
    });

    return user[0];
  },
};
