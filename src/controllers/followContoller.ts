import { Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { followService } from "../services/followService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const FollowController = {
  //POST /follow
  follow: async (req: AuthorizatedRequest, res: Response) => {
    const { userToFollowId } = req.body;
    const user = req.user!;

    try {
      await followService.follow(user.id, Number(userToFollowId));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /follow
  unfollow: async (req: AuthorizatedRequest, res: Response) => {
    const { userToUnfollowId } = req.body;
    const user = req.user!;

    try {
      await followService.unfollow(user.id, userToUnfollowId);

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /followers
  getFollowers: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const followers = await followService.getFollowers(
        user.id,
        page,
        perPage
      );

      res.status(200).json(followers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /followings
  getFollowings: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const [page, perPage] = getPaginationParams(req.query);
    try {
      const followings = await followService.getFollowings(
        user.id,
        page,
        perPage
      );

      res.status(200).json(followings);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
