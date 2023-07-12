import { Op, where } from "sequelize";
import { User, UserCreationsAttributes } from "../models/User";

export const userService = {
  create: async (params: UserCreationsAttributes) => {
    const user = await User.create(params);
    return user;
  },
  show: async (nickname: string) => {
    const user = await User.findOne({
      where: { nickname },
      attributes: [
        "id",
        "nickname",
        "name",
        "bio",
        "locale",
        "birth",
        ["profile_img", "profileImg"],
        ["profile_banner_img", "profileBannerImg"],
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

  search: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${name}%`,
          },

          nickname: {
            [Op.iLike]: `%${name}%`,
          },
        },
      },

      attributes: [
        "id",
        "nickname",
        "name",
        "bio",
        "locale",
        "birth",
        ["profile_img", "profileImg"],
        ["profile_banner_img", "profileBannerImg"],
      ],
      offset: offset,
      limit: perPage,
      distinct: true,
    });

    return {
      users: rows,
      page,
      perPage,
      total: count,
    };
  },

  profileUpdate: async (
    id: number,
    attributes: {
      name: string;
      bio: string;
      birth: Date;
      locale: string;
      profileImg: string;
      profileBannerImg: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });
    return updatedUsers[0];
  },

  accountDataUpdate: async (
    id: number,
    attributes: {
      nickname: string;
      email: string;
    }
  ) => {
    const userEmailAlreadyExists = await userService.findByEmail(
      attributes.email
    );
    const userNicknameAlreadyExists = await userService.findByNickname(
      attributes.nickname
    );
    const user = await User.findByPk(id);

    if (userEmailAlreadyExists) {
      if (userEmailAlreadyExists.id !== user?.id) {
        throw new Error("Email already exists!");
      }
    }

    if (userNicknameAlreadyExists) {
      if (userNicknameAlreadyExists.id !== user?.id) {
        throw new Error("Nickname already exists!");
      }
    }

    await user?.update(attributes);
  },

  passwordUpdate: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      {
        where: { id },
        returning: true,
        individualHooks: true,
      }
    );
    return updatedUsers[0];
  },

  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  },

  findByNickname: async (nickname: string) => {
    const user = await User.findOne({
      where: { nickname },
    });

    return user;
  },

  delete: async function name(id: number) {
    await User.destroy({ where: { id } });
  },
};
