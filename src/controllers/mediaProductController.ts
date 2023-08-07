import { Request, Response } from "express";
import { MediaProduct } from "../models";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { mediaProductService } from "../services/mediaProductService";

export const MediaProductController = {
  //GET /media-products/
  all: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const mediaProducts = await mediaProductService.all(page, perPage);

      return res.status(200).json(mediaProducts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },

  //GET /media-products/search/
  search: async (req: Request, res: Response) => {
    const { title } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof title !== "string") {
        throw new Error("Query title must be of type string");
      }
      const mediaProducts = await mediaProductService.findByTitle(
        title,
        page,
        perPage
      );

      return res.status(200).json(mediaProducts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return error;
    }
  },
};
