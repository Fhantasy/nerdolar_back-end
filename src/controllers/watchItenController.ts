import { Response } from "express";
import { AuthorizatedRequest } from "../middlewares/auth";
import { watchItenService } from "../services/watchItenService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const WatchItenController = {
  //POST /watchIten
  create: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { status, currentEpisode, mediaProductId } = req.body;

    try {
      await watchItenService.create({
        status,
        currentEpisode,
        userId: user.id,
        mediaProductId,
      });

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //DELETE /watchIten/:id
  delete: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      await watchItenService.delete(user.id, Number(id));

      res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //PUT /watchIten
  update: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { status, currentEpisode, watchItenId } = req.body;

    try {
      await watchItenService.update(
        { status, currentEpisode },
        watchItenId,
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

  //GET /watchIten/:id
  getOne: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    try {
      const watchIten = await watchItenService.getOne(user.id, Number(id));

      if (!watchIten) res.status(404).json({ message: "WatchIten not found" });

      res.status(200).json(watchIten);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /watchItens
  getAllFromUser: async (req: AuthorizatedRequest, res: Response) => {
    const user = req.user!;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const watchItens = await watchItenService.getAllFromUser(
        user.id,
        page,
        perPage
      );

      res.status(200).json(watchItens);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
