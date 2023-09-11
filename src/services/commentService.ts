import { User } from "../models";
import { Comment, CommentCreationsAttributes } from "../models/Comment";

export const commentService = {
  create: async (params: CommentCreationsAttributes) => {
    await Comment.create(params);
  },

  getAllFromPost: async (postId: number, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Comment.findAndCountAll({
      where: { postId },
      attributes: ["id", "message", ["created_at", "createdAt"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "nickname", "name", ["profile_img", "profileImg"]],
        },
      ],
      distinct: true,
      limit: perPage,
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      comments: rows,
      page,
      perPage,
      total: count,
    };
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
