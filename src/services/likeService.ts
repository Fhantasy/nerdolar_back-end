import { Like, LikeCreationsAttributes } from "../models/Like";

export const likeService = {
  create: async (params: LikeCreationsAttributes) => {
    await Like.create(params);
  },

  delete: async (userId: number, postId: number) => {
    await Like.destroy({
      where: {
        userId,
        postId,
      },
    });
  },
};
