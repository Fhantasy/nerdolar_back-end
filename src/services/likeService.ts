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

  includeIsLiked: async (posts: PostInstance[], userId: number) => {
    posts.forEach(async (post) => {
      const isLiked = await Like.findOne({
        where: { userId, postId: post.id },
      });

      if (isLiked) {
        post.isLiked = true;
      } else {
        post.isLiked = false;
      }
    });
  },
};
