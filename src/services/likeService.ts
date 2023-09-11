import { Post } from "../models";
import { Like, LikeCreationsAttributes } from "../models/Like";
import { PostInstance } from "../models/Post";

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
