import { Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const LikeController = {
  //POST /like
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { postId } = req.body;

    try {
      await likeService.create({ userId: user.id, postId });

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /like
  delete: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      await likeService.delete(user.id, Number(id));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
