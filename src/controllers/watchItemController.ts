import { Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { watchItemService } from "../services/watchItemService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const WatchItemController = {
  //POST /watch-item
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { mediaProductId, categoryId } = req.body;

    try {
      const wacthItem = await watchItemService.create({
        userId: user.id,
        mediaProductId,
        categoryId,
      });

      res.status(200).json({ id: wacthItem.id });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /watchItem/:id
  delete: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      await watchItemService.delete(user.id, Number(id));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /watchItem
  update: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { status, currentEpisode, watchItemId } = req.body;

    try {
      await watchItemService.update(
        { status, currentEpisode },
        watchItemId,
        user.id
      );

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /watchItem/:id
  getOne: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      const watchItem = await watchItemService.getOne(user.id, Number(id));

      if (!watchItem) res.status(404).json({ message: "WatchItem not found" });

      res.status(200).json(watchItem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  getReleasesPerCategory: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;

    try {
      const watchItems = await watchItemService.getReleasesPerCategory(user.id);

      res.status(200).json(watchItems);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /watch-itens/category/:id/:userId?status=ongoing
  getAllPerCategory: async (req: AuthorizatedRequest, res: Response) => {
    const { userId } = req.params;
    const { categoryId } = req.params;
    const { status } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const watchItems = await watchItemService.getAllPerCategory(
        Number(userId),
        Number(categoryId),
        status === "ongoing" || status === "complete" ? status : "ongoing",
        page,
        perPage
      );

      res.status(200).json(watchItems);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
