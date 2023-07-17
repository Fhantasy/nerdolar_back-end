import { Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { commentService } from "../services/commentService";

export const CommentController = {
  //POST /comment
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { message, postId } = req.body;

    try {
      await commentService.create({ message, userId: user.id, postId });

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /comment/:id
  delete: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      await commentService.delete(user.id, Number(id));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
