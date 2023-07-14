import { Follow, User } from "../models";

export const followService = {
  follow: async (userFollowingId: number, userFollowedId: number) => {
    console.log(userFollowingId, userFollowedId);
    await Follow.create({
      userFollowingId,
      userFollowedId,
    });
  },

  unfollow: async (userFollowingId: number, userFollowedId: number) => {
    await Follow.destroy({
      where: {
        userFollowedId,
        userFollowingId,
      },
    });
  },

  getFollowers: async (userId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Follow.findAndCountAll({
      where: {
        userFollowedId: userId,
      },
      include: {
        model: User,
        as: "follower",
        attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
      },
      attributes: [],
      limit: perPage,
      offset,
    });

    return {
      folowers: rows,
      page,
      perPage,
      total: count,
    };
  },

  getFollowings: async (userId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Follow.findAndCountAll({
      where: {
        userFollowingId: userId,
      },
      include: {
        model: User,
        as: "follow",
        attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
      },
      attributes: [],
      limit: perPage,
      offset,
    });

    return {
      folowings: rows,
      page,
      perPage,
      total: count,
    };
  },
};
