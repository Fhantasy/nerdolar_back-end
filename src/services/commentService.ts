import { Comment, CommentCreationsAttributes } from "../models/Comment";

export const commentService = {
  create: async (params: CommentCreationsAttributes) => {
    await Comment.create(params);
  },

  delete: async (userId: number, commentId: number) => {
    await Comment.destroy({
      where: {
        userId,
        id: commentId,
      },
    });
  },
};
